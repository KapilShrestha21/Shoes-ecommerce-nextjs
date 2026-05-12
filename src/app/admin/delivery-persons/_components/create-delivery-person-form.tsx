import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { deliveryPersonSchema } from '@/lib/validators/deliveryPersonSchema'
import { useQuery } from '@tanstack/react-query';
import { Warehouse } from '@/types';
import { getAllWarehouses } from '@/http/api';

export type FormValues = z.input<typeof deliveryPersonSchema>;

const CreateDeliveryPersonForm = ({
  onSubmit, disabled
}: {
  onSubmit: (formValues: FormValues) => void;
  disabled: boolean
}) => {

  const form = useForm<z.infer<typeof deliveryPersonSchema>>({
    resolver: zodResolver(deliveryPersonSchema),
    defaultValues: {
      name: '',
      phone: '',
    },
  });

  const { data: warehouses, isLoading, isError } = useQuery<Warehouse[]>({
    queryKey: ["warehouses"],
    queryFn: getAllWarehouses,
  })

  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 mx-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Yagami Light" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="e.g. 9841390478" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="warehouseId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Warehouse ID</FormLabel>
              <Select
                onValueChange={(value) => field.onChange(parseInt(value))} // database expect number so convert string into number
                defaultValue={field.value ? field.value.toString() : ''}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Warehouse ID" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {isLoading ? (
                    <SelectItem value="Loading">Loading...</SelectItem>
                  ) : (
                    <>
                      {warehouses &&
                        warehouses.map((item) => (
                          <SelectItem
                            key={item.id}
                            value={item.id ? item.id?.toString() : ''}
                          >
                            {item.name}
                          </SelectItem>
                        ))
                      }
                    </>
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" disabled={disabled}>
          {disabled ? <Loader2 className="size-4 animate-spin" /> : 'Create'}
        </Button>
      </form>
    </Form>
  )
}

export default CreateDeliveryPersonForm