import { products } from "@/lib/db/schema";
import { productSchema } from "@/lib/validators/productSchema";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import fs from "fs/promises";
import { desc } from "drizzle-orm";
import { db } from "@/lib/db/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";

export async function POST(request: Request) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return Response.json({ message: 'Not allowed'}, { status: 401})
    }

    if (session.user?.role !== 'admin') {
        return Response.json({ message: 'Not allowed'}, { status: 403} )
    }

    const data = await request.formData(); // we write formData instead of json because we have to get image too..

    let validatedData;

    try {
        validatedData = productSchema.parse({
            name: data.get('name'),
            description: data.get('description'),
            price: Number(data.get('price')),
            image: data.get('image'),
        })
    } catch (err: any) {

        if (err.errors) {
        return Response.json({ message: "Validation failed", errors: err.errors }, { status: 400 });
    }
        return Response.json({ message: err || "Invalid input data" }, { status: 400 });
    }

    // Date.now() - gives currrent date like 241242323
    // ${validatedData.image.name.split(".").slice(-1)}` below
    // it gives last value of filename like .png, .jpg 
    // if we have shirt.photo.jpg - then .split(".") chops it into array like - ["shirt", "photo", "jpg"] - and .slice(-1) is use to get last value of array which is .jpg
    // so the final result will be 3425344.jpg - to store in local file and later in cloudinary

    console.log(validatedData.image) // todo: remove

    const file = validatedData.image as File

    const extension = file.name.split(".").pop();
    const filename = `${Date.now()}.${extension}`;

    try {
        // Browser gives file as a File object → convert to ArrayBuffer (raw bytes)
        // Then convert to Buffer because Node.js APIs (like writeFile) require Buffer
        const buffer = Buffer.from(await file.arrayBuffer());
        await writeFile(path.join(process.cwd(), "public", "assets", filename), buffer);

    } catch (err) {
        return Response.json({ message: "Failed to save the file to fs: file system" },
            { status: 500 }
        )
    }

    try {
        await db.insert(products).values({
            name: validatedData.name,
            description: validatedData.description,
            price: validatedData.price,
            image: filename,
        })

    } catch (err) {

        const fullPath = path.join(process.cwd(), "public", "assets", filename)
        await fs.unlink(fullPath).catch(() => null);

        return Response.json(
            { message: "Failed to store product into the database" },
            { status: 500 }
        )
    }

    return Response.json({ message: 'OK' }, { status: 201 })
}

export async function GET() {

    try {
        const allProducts = await db
            .select()
            .from(products)
            .orderBy(desc(products.id));

        return Response.json(allProducts)
    } catch (error) {
        return Response.json({ message: 'Failed to fetch products' }, { status: 500 })

    }
}

