import { z } from "zod";

export const warehouseSchema = z.object({
    name: z.string({message: "Warehouse name should be string"}),
    pincode: z.string({message: "Pincode should be string"}).length(6),
});

