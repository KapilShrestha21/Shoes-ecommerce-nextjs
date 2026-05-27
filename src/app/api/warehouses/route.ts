import { authOptions } from "@/lib/auth/authOptions";
import { db } from "@/lib/db/db";
import { warehouses } from "@/lib/db/schema";
import { warehouseSchema } from "@/lib/validators/warehouseSchema";
import { getServerSession } from "next-auth";

export async function POST(request: Request) {

   const session = await getServerSession(authOptions);
    if (!session) {
        return Response.json({ message: 'Not allowed' }, { status: 401 });
    }

    if (session.user?.role !== 'admin') {
        return Response.json({ message: 'Not allowed' }, { status: 403 });
    }

   const requestData = await request.json();
   let validatedData;

   try {
      // parse = take raw input and turn it into structured, usable data..
      validatedData = await warehouseSchema.parse(requestData)

      // todo: remove
      console.log("Validated Data:", validatedData);
   } catch (err) {
      return Response.json({ message: err }, { status: 400 })
   }


   try {
      await db.insert(warehouses).values(validatedData)
      return Response.json({message: 'Ok'}, {status: 201})

   } catch (err) {
      return Response.json({ message: 'Failed to s the warehouse' }, {status: 500})
   }
}

export async function GET() {
   try {
      const alWarehouses = await db.select().from(warehouses)
      return Response.json(alWarehouses)

   } catch (error) {
      return Response.json({ message: 'Failed to fetch all warehouses'}, {status: 500});
   }
}