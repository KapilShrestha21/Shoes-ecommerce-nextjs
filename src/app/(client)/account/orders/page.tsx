'use client';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import React from 'react';
import Header from '../../_components/header';
import { CircleCheck, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { MyOrder } from '@/types';
import { capitalizeFirstLetter } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { getMyOrders } from '@/http/api';

const MyOrdersPage = () => {
    // Setup the query and cast queryFn as any to bypass inner type wrapper layout conflicts
    const {
        data,
        isLoading,
        isError,
    } = useQuery<MyOrder[]>({
        queryKey: ['my-orders'],
        queryFn: getMyOrders as any, 
    });

    // Extract out data cleanly with a guaranteed array fallback schema 
    const ordersList = data ?? [];

    return (
        <div>
            <Header />
            <section className="relative border-t">
                <div className="mx-auto h-full max-w-5xl px-5 py-14">
                    <h1 className="mb-2 text-3xl font-bold">Order history</h1>
                    <p className="mb-5">Check the status of recent orders.</p>
                    <div className="space-y-5">
                        {isLoading && <Loader2 className="size-10 animate-spin" />}
                        {isError && <span>Something went wrong</span>}
                        
                        {/* Map directly over the safely initialized orders array variable */}
                        {ordersList.slice(0, 7).map((item) => (
                            <Card key={item.id}>
                                <div className="flex gap-x-5">
                                    <div className="flex flex-col p-5 text-sm">
                                        <span className="font-medium">Date placed</span>
                                        <span>{formatDate(item.createdAt)}</span>
                                    </div>
                                    <div className="flex flex-col p-5 text-sm">
                                        <span className="font-medium">Total amount</span>
                                        <span>${item.price}</span>
                                    </div>
                                </div>
                                <Separator />
                                <div className="flex gap-x-10 p-5">
                                    <Image
                                        src={`/assets/${item.image}`}
                                        alt="img"
                                        width={120}
                                        height={120}
                                        className="aspect-square rounded-md object-cover"
                                    />
                                    <div className="flex-1 space-y-2">
                                        <div className="flex justify-between">
                                            <h3 className="text-2xl font-semibold">
                                                {item.product}
                                            </h3>
                                            <span className="text-2xl font-semibold">
                                                ${item.price}
                                            </span>
                                        </div>
                                        <p>{item.productDescription}</p>
                                        <div className="flex justify-end">
                                            <div className="flex gap-2">
                                                <CircleCheck
                                                    className="size-5 text-white"
                                                    fill="#4ade80"
                                                />
                                                <span className="text-sm">
                                                    {capitalizeFirstLetter(item.status)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MyOrdersPage;

function formatDate(isoString: string): string {
    const date = new Date(isoString);

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate;
}