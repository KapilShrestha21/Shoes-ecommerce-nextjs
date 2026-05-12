import { z } from "zod";

export const deliveryPersonSchema = z.object({
    name: z.string({ message: "Delivery person name should be string" }),
    phone: z
        .string({ message: "Pincode should be string" })
        .length(10, "Delivery person phone number should be 10 chars long"),
    warehouseId: z.number({ message: "Warehouse id should be a number"})
});

