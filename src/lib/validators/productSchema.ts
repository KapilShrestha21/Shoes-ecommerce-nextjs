import { z } from "zod";

const isServer = typeof window === 'undefined'; // to check it is not on client side and on server side

export const productSchema = z.object({
    name: z.string({message: "Product name should be string"}).min(4),
    image: z.instanceof(isServer ? File : FileList, {message: "Product image should be a image"}),
    description: z.string({message: "Product description should be a string"}).min(8),
    price: z.number({message: "Product price should be a number"})
});

