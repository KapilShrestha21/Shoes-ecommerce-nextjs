'use client';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { getAllProducts } from '@/http/api';
import { Product } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';

const Products = () => {
    // Show 4 skeletons on mobile grid view layouts
    const skeletons = Array.from({ length: 4 });

    const { data, isLoading } = useQuery<Product[]>({
        queryKey: ['products'],
        queryFn: getAllProducts as any,
        staleTime: 10 * 1000,
    });

    const products = data ?? [];

    return (
        <section className="bg-[#f5f5f5] px-4 sm:px-5 py-12 md:py-20">
            <div className="mx-auto max-w-6xl">
                
                {/* Responsive Section Header */}
                <div className="flex items-center justify-center gap-3 sm:gap-5 w-full">
                    <Separator className="bg-amber-900 !h-0.5 w-12 sm:w-20 hidden xs:block" />
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-amber-900 text-center">
                        Products
                    </h2>
                    <Separator className="!h-0.5 w-12 sm:w-20 bg-amber-900 hidden xs:block" />
                </div>

                {/* Grid Layout: Adjusted mobile gap definitions */}
                <div className="mt-10 md:mt-20 grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-8 md:grid-cols-3 lg:grid-cols-4">
                    {isLoading ? (
                        <>
                            {skeletons.map((_, i) => (
                                <div key={i} className="flex h-full w-full flex-col gap-3 sm:gap-5">
                                    <Skeleton className="aspect-square w-full rounded-lg bg-amber-100/60" />
                                    <Skeleton className="h-5 w-11/12 rounded-md bg-amber-100/60" />
                                    <Skeleton className="h-5 w-16 rounded-md bg-amber-100/60" />
                                    <Skeleton className="h-9 sm:h-8 w-full rounded-md bg-amber-100/60" />
                                </div>
                            ))}
                        </>
                    ) : (
                        <>
                            {products?.map((product: Product) => {
                                return (
                                    <Link 
                                        href={`/product/${product.id}`}
                                        key={product.id}
                                        className="group flex flex-col items-start justify-between h-full bg-white p-2.5 sm:p-0 rounded-xl sm:rounded-none sm:bg-transparent shadow-sm sm:shadow-none transition-transform duration-200 active:scale-[0.98] sm:active:scale-100"
                                    >
                                        <div className="w-full flex flex-col gap-3 sm:gap-4">
                                            {/* Modern Next.js Responsive Image Wrapper */}
                                            <div className="relative aspect-square w-full overflow-hidden rounded-lg shadow-sm sm:shadow-lg">
                                                <Image
                                                    src={`/assets/${product.image}`}
                                                    alt={product.name}
                                                    fill
                                                    sizes="(max-w-640px) 50vw, (max-w-1024px) 33vw, 25vw"
                                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                                />
                                            </div>

                                            <div className="w-full px-1 sm:px-0">
                                                <p className="text-sm sm:text-lg font-semibold text-amber-900 line-clamp-1 group-hover:underline">
                                                    {product.name}
                                                </p>
                                                <div className="mt-0.5 sm:mt-1">
                                                    <span className="text-sm sm:text-base font-bold text-zinc-900">${product.price}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action CTA Anchor Button */}
                                        <div className="w-full px-1 sm:px-0 mt-3 sm:mt-5">
                                            <Button
                                                size={'sm'}
                                                className="w-full h-9 sm:h-8 bg-amber-900 text-xs sm:text-sm font-medium hover:bg-amber-800 transition-colors pointer-events-none"
                                            >
                                                Buy Now
                                            </Button>
                                        </div>
                                    </Link>
                                );
                            })}
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Products;