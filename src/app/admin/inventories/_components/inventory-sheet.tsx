import React from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import CreateInventoryForm, { FormValues } from './create-inventory-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createInventory } from '@/http/api'
import { InventoryData } from '@/types'
import { toast } from 'sonner'
import { useNewInventory } from '@/store/inventory/inventory-store'

const InventorySheet = () => {
  const { isOpen, onClose } = useNewInventory()
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ['create-inventory'],
    mutationFn: ( data: InventoryData ) => createInventory(data),
    onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['inventories'] });
            toast('Inventory created successfully');
            onClose();
        },
    },
  )

  const onSubmit = (values: FormValues) => {
    mutate(values)
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="min-w-[28rem] space-y-4">
        <SheetHeader>
          <SheetTitle>Create Inventory</SheetTitle>
          <SheetDescription>Create a new inventory</SheetDescription>
        </SheetHeader>
        <CreateInventoryForm onSubmit={onSubmit} disabled={isPending}/>
      </SheetContent>
    </Sheet>
  )
}

export default InventorySheet