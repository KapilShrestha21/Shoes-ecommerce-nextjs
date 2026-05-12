import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { warehouseSchema } from '@/lib/validators/warehouseSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'

export type FormValues = z.input<typeof warehouseSchema>;

const CreateWarehouseForm = ({ onSubmit, disabled }: { onSubmit: (formValues: FormValues) => void; disabled: boolean; }) => {

  const form = useForm<z.infer<typeof warehouseSchema>>({
    resolver: zodResolver(warehouseSchema),
    defaultValues: {
      name: '',
      pincode: '',
    },
  })

  // first agrument need to be data - values ma value xa tala ko form ko
  const handleSubmit = (values: FormValues) => {
    onSubmit(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 mx-4">
        {/* Name */}
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='e.g. Warehouse 1' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Pincode */}
        <FormField
          control={form.control}
          name='pincode'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pincode</FormLabel>
              <FormControl>
                <Input placeholder='e.g. 343246' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" disabled={disabled}>
          {disabled ? <Loader2 className='size-4 animate-spin' /> : 'Create'}
        </Button>
      </form>
    </Form>
  )
}

export default CreateWarehouseForm 