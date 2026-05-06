import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import CreateProductForm, { FormValues } from "./create-product-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createProduct } from "@/http/api"
import { useNewProduct } from "@/store/product/product-store"
import { toast } from "sonner"

const ProductSheet = () => {
    const {isOpen, onClose} = useNewProduct()
    const queryClient = useQueryClient()

    const { mutate, isPending } = useMutation({
        mutationKey: ['create-product'],
        mutationFn: (data: FormData) => createProduct(data), // this (data: FormData) variable takes data from mutate(formData) which is below and pass to createProduct(data) to store in database
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products']}); 
            toast("Product created successfully")
            onClose()
        },
    })


    // to convert into FormData, so api can read - we convert it because it has to carry image database
    const onSubmit = (values: FormValues) => {
        console.log('values', values);

        const formData = new FormData()
        formData.append("name", values.name)
        formData.append("description", values.description)
        formData.append("price", String(values.price))
        formData.append("image", (values.image as FileList)[0]) 
        
        mutate(formData) // this data which is hold by formData is transfer to above - mutationFn: (data: FormData) - in data variable 
    }

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="min-w-[28rem] space-y-4">
                <SheetHeader>
                    <SheetTitle>Create Product</SheetTitle>
                    <SheetDescription>Create a new product</SheetDescription>
                </SheetHeader>
                <CreateProductForm onSubmit={onSubmit} disabled={isPending}/>
            </SheetContent>
        </Sheet>
    )
}

export default ProductSheet

// If we trace the data from the very beginning, it looks like this:

// User Input → (passed to) → React Hook Form

// React Hook Form → (passed to) → Zod Validation

// Zod (if valid) → (passed to) → handleSubmit

// handleSubmit → (passed to) → onSubmit(values) (Your function)

// onSubmit → (converts data to FormData and passes to) → mutate(formData)

// mutate → (passed to) → createProduct

// createProduct → (passed to) → Your Backend Server