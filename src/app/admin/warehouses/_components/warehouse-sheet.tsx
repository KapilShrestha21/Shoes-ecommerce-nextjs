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
import { useNewWarehouse } from "@/store/warehouse/warehouse-store";
import CreateWarehouseForm, { FormValues } from "./create-warehouse-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createWarehouse } from "@/http/api";
import { Warehouse } from "@/types";
import { toast } from "sonner";

const WarehouseSheet = () => {

        const { isOpen, onClose } = useNewWarehouse();
        
        const queryClient = useQueryClient()

        const { mutate, isPending } = useMutation({
            mutationKey: ['create-warehouse'],
            mutationFn: (data: Warehouse) => createWarehouse(data),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['warehouses']})
                toast("Warehouse created successfully")
                onClose()
            }
        })

        const onSubmit = (values: FormValues) => {
            mutate(values as Warehouse)
        };

    return (
        // open and onOpenChange are predefined props supported by Sheet/ShadeCn ui library.
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="min-w-[28rem] space-y-4">
                <SheetHeader>
                    <SheetTitle>Create Warehouse</SheetTitle>
                    <SheetDescription>Create a new warehouse</SheetDescription>
                </SheetHeader>
                <CreateWarehouseForm onSubmit={onSubmit} disabled={isPending}  />
            </SheetContent>
        </Sheet>
    )
}

export default WarehouseSheet;