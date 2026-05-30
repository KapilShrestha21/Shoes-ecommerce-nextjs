import { authOptions } from "@/lib/auth/authOptions";
import { db } from "@/lib/db/db";
import { deliveryPersons, inventories, orders, products, users, warehouses } from "@/lib/db/schema";
import { orderSchema } from "@/lib/validators/orderSchema";
import { and, eq, inArray, isNull, desc, or } from "drizzle-orm";
import { getServerSession } from "next-auth";

export async function POST(request: Request) {

    // get session
    const session = await getServerSession(authOptions);
    console.log('server session', session);

    if (!session) {
        return Response.json({ message: 'Not allowed' }, { status: 401 });
    }

    // validate request body
    const requestData = await request.json()
    let validateData;

    try {
        validateData = await orderSchema.parse(requestData);
    } catch (err) {
        return Response.json({ message: err }, { status: 400 });
    }

    console.log('validated data', validateData);

    // order creation

    const warehouseResult = await db
        .select({ id: warehouses.id })
        .from(warehouses)
        .where(eq(warehouses.pincode, validateData.pincode))

    if (!warehouseResult) {
        return Response.json({ message: 'No warehouse found' }, { status: 400 })
    }

    const foundProducts = await db
        .select()
        .from(products)
        .where(eq(products.id, validateData.productId))
        .limit(1);

    if (!foundProducts) {
        return Response.json({ message: 'No product found' }, { status: 400 })
    }

    let transactionError: string = '';
    let finalOrder: any = null;

    try {
        finalOrder = await db.transaction(async (tx) => {

            //create order
            const order = await tx
                .insert(orders)
                // @ts-ignore
                .values({
                    ...validateData,
                    // @ts-ignore
                    userId: parseInt(session.user.id),
                    price: foundProducts[0].price * validateData.qty,
                    // todo: move all status to enum or const
                    status: 'received'
                }).returning({ id: orders.id, price: orders.price });

            // check stock
            const availableStock = await tx
                .select()
                .from(inventories)
                .where(and(
                    eq(inventories.warehouseId, warehouseResult[0].id),
                    eq(inventories.productId, validateData.productId),
                    isNull(inventories.orderId)
                )
                ).limit(validateData.qty)
                .for('update', { skipLocked: true });


            if (availableStock.length < validateData.qty) {
                transactionError = `Stock is low, only ${availableStock.length} products available`;
                tx.rollback()
                return;
            }

            // check delivery person availibility
            const availablePersons = await tx
                .select()
                .from(deliveryPersons)
                .where(and(
                    isNull(deliveryPersons.orderId),
                    eq(deliveryPersons.warehouseId, warehouseResult[0].id)
                )
                )
                .for('update') // it means lock this row 
                .limit(1);

            if (!availablePersons.length) {
                transactionError = `Delivery person is not available at the moment`;
                tx.rollback();
                return;
            }

            // stock is available and delivery person is available
            // update inventories table and add order_id

            await tx
                .update(inventories)
                .set({ orderId: order[0].id })
                .where(
                    inArray(
                        inventories.id,
                        availableStock.map((stock) => stock.id)
                    )
                );


            // update delivery person
            await tx
                .update(deliveryPersons)
                .set({ orderId: order[0].id })
                .where(eq(deliveryPersons.id, availablePersons[0].id))

            // Confirm reserve status flags
            const updatedOrder = await tx
                .update(orders)
                .set({ status: 'reserved' })
                .where(eq(orders.id, order[0].id));

            return updatedOrder[0];
        })
    } catch (err) {

        // If it's an intentional rollback we caught, let the block below catch and return a 400
        console.error("Transaction error:", err);
        if (transactionError) {
            return Response.json({ message: transactionError }, { status: 400 }); // 🟢 Return 400 instead of 500
        }

        // log
        // in production -> be careful don't return internal errors to the client.
        return Response.json(
            {
                message: transactionError ? transactionError : 'Error while db transaction',
            },
            { status: 500 }
        );
    }

    // Final fallback verification check in case transaction returned without throwing
    if (transactionError) {
        return Response.json({ message: transactionError }, { status: 400 });
    }

    // Success response
    return Response.json({ success: true, data: finalOrder }, { status: 201 });
}

export async function GET() {
    // todo: add authentication and authorization
    // todo: add logging
    // todo: add error handling
    const allOrders = await db
        .select({
            id: orders.id,
            product: products.name,
            productId: products.id,
            userId: users.id,
            user: users.fname,
            type: orders.type,
            price: orders.price,
            image: products.image,
            status: orders.status,
            address: orders.address,
            qty: orders.qty,
            createAt: orders.createdAt,
        })
        .from(orders)
        .leftJoin(products, eq(orders.productId, products.id))
        .leftJoin(users, eq(orders.userId, users.id))
        // join inventories (orderId)
        // join delivery person (orderId)
        // join warehouse (deliveryId)
        // todo: 1. use pagination, 2. Put index
        .orderBy(desc(orders.id));
    return Response.json(allOrders)
}

