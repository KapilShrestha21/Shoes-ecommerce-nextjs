import { z } from "zod";

export const orderStatusSchema = z.object({
    orderId: z.number({ message: "Order id should be a number" }),
    // todo: check if order status is string
    status: z.string({ message: "Status should be a string" })
});