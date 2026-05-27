import { db } from "@/lib/db/db"
import { products } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // Guard check: Convert to a number and verify it is valid before touching the DB
    const productId = Number(id);

    if (isNaN(productId)) {
        return Response.json(
            { message: 'Invalid product ID parameter format' }, 
            { status: 400 } // Return 400 Bad Request instead of breaking with a 500
        );
    }

    // it will store and return value in array
    try {
        const product = await db
            .select()
            .from(products)
            .where(eq(products.id, productId)) // comparing id's
            .limit(1);

        if (!product.length) {
            return Response.json({ message: 'Product not found' }, { status: 400 })
        }

        return Response.json(product[0])
    } catch (err) {
        console.error("Database query failed:", err); // Log the actual error to your terminal console
        return Response.json({ message: 'Failed to fetch a product' }, { status: 500 })
    }

}

