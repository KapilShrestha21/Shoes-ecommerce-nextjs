import { db } from "@/src/lib/db/db";
import { warehouses } from "@/src/lib/db/schema";
import { warehouseSchema } from "@/src/lib/validators/warehouseSchema";

export async function POST(request: Request) {

   // todo: check auth
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