'use client'

import { Button } from '@/components/ui/button'
import DeliveryPersonSheet from './_components/delivery-person-sheet'
import { DataTable } from '../_components/data-table'
import { columns } from './_components/columns'
import { useQuery } from '@tanstack/react-query'
import { getAllDeliveryPersons } from '@/http/api'
import { DeliveryPerson } from '@/types'
import { useNewDeliveryPerson } from '@/store/deliveryPerson/delivery-person-store'
import { Loader2 } from 'lucide-react'

const DeliveryPersonPage = () => {

    const { onOpen } = useNewDeliveryPerson()

    const {data: deliveryPerson, isLoading, isError} = useQuery<DeliveryPerson[]>({
        queryKey: ['deliveryPerson'],
        queryFn: getAllDeliveryPersons
    })

  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold tracking-tight">Delivery-Person</h3>
        <Button size={'sm'}
          onClick={onOpen}
        >
          Add Delivery Person
        </Button>
        <DeliveryPersonSheet />
      </div>

      {isError && (<span className='text-red-500'>Something went wrong</span>)}

      {
          isLoading ? (
            <div className='flex items-center justify-center'>
                <Loader2 className='size-10 animate-spin' />
            </div>
          ) :
          <DataTable columns={columns} data={deliveryPerson || [] } />
        }
      </>
  )
}

export default DeliveryPersonPage