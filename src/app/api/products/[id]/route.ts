import { db } from "@/lib/db/db"
import { products } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // it will store and return value in array
    try {
        const product = await db
            .select()
            .from(products)
            .where(eq(products.id, Number(id))) // comparing id's
            .limit(1);

        if (!product.length) {
            return Response.json({ message: 'Product not found' }, { status: 400 })
        }

        return Response.json(product[0])
    } catch (err) {
        return Response.json({ message: 'Failed to fetch a product' }, { status: 500 })
    }

}

