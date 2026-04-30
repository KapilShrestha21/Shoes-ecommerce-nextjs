import { db } from "@/src/lib/db/db";
import { inventories, products, warehouses } from "@/src/lib/db/schema";
import { inventorySchema } from "@/src/lib/validators/inventorySchema";
import { desc, eq } from "drizzle-orm";

export async function POST(request: Request) {
    const requestData = await request.json()

    let validatedData;

    try {
        validatedData = await inventorySchema.parse(requestData)

    } catch (err) {
        return Response.json({ message: err }, { status: 400 })
    }


    try {
        await db.insert(inventories).values(validatedData);

        return Response.json({ message: "Ok" }, { status: 201 })

    } catch (err) {
        return Response.json({ message: "Failed to store the inventory into the database" }, { status: 400 })
    }
}

export async function GET() {
    try {
        const allInventories = await db
            .select({
                id: inventories.id,
                sku: inventories.sku,
                warehouse: warehouses.name,
                product: products.name
            })
            .from(inventories)
            .leftJoin(warehouses, eq(inventories.warehouseId, warehouses.id))
            .leftJoin(products, eq(inventories.productId, products.id))
            .orderBy(desc(inventories.id))

        return Response.json(allInventories)
    } catch (error) {
        return Response.json({ message: "Failed to fetch inventories" }, { status: 500 })
    }
}