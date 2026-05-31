'use client';

import { getSingleProduct, placeOrder } from '@/http/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams, usePathname } from 'next/navigation';
import React, { useEffect } from 'react';
import Header from '../../_components/header';
import { Star } from 'lucide-react';
import { Product } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { orderSchema } from '@/lib/validators/orderSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { toast } from 'sonner';

type CustomError = {
    message: string;
};

type FormValues = z.infer<typeof orderSchema>;

const SingleProduct = () => {
    const params = useParams();
    const pathname = usePathname();
    const id = params?.id;

    const { data: session } = useSession();

    const form = useForm<FormValues>({
        resolver: zodResolver(orderSchema),
        defaultValues: {
            address: "",
            pincode: "",
            qty: 1,
            productId: id ? Number(id) : 0,
        }
    });

    useEffect(() => {
        if (id && id !== 'undefined') {
            form.setValue('productId', Number(id));
        }
    }, [id, form]);

    const { data: product, isLoading } = useQuery<Product>({
        queryKey: ['product', id],
        queryFn: (() => getSingleProduct(id as string)) as any,
        enabled: !!id && id !== 'undefined',
    });

    const { mutate, isPending } = useMutation({
        mutationKey: ['order'],
        mutationFn: (data: FormValues) => placeOrder({ ...data, productId: Number(id) }),
        onSuccess: () => {
            toast.success("Order placed successfully!");
            form.reset({
                address: "",
                pincode: "",
                qty: 1,
                productId: id ? Number(id) : 0,
            });
        },
        onError: (err: any) => {
            if (err.response?.data) {
                const customErr = err.response.data as CustomError;
                toast.error(customErr.message);
            } else {
                toast.error('Unknown error');
            }
        },
    });

    const onSubmit = (values: FormValues) => {
        mutate(values);
    };

    const qty = form.watch("qty");

    const price = React.useMemo(() => {
        if (product?.price) {
            return product.price * qty;
        }
        return 0;
    }, [qty, product]);

    return (
        <>
            <Header />
            <section className="min-h-screen bg-[#f5f5f5] px-4 sm:px-6 py-8 md:py-16">
                {/* Responsive Content Wrapper: Column on mobile, Row on desktop */}
                <div className="mx-auto flex flex-col lg:flex-row max-w-5xl gap-8 lg:gap-x-12 items-start">
                    
                    {/* Image Column Block */}
                    <div className="w-full lg:w-[26rem] xl:w-[28rem] flex-shrink-0">
                        {isLoading ? (
                            <Skeleton className="aspect-square w-full rounded-xl bg-amber-100/60" />
                        ) : (
                            <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-white shadow-xl">
                                <Image
                                    src={`/assets/${product?.image ?? '/product1.jpg'}`}
                                    alt={product?.name ?? 'Product Image'}
                                    fill
                                    priority
                                    sizes="(max-w-1024px) 100vw, 450px"
                                    className="object-cover"
                                />
                            </div>
                        )}
                    </div>

                    {/* Product Details & Form Column Block */}
                    <div className="w-full flex-1">
                        {isLoading ? (
                            <div className="flex flex-col gap-y-3 w-full">
                                <Skeleton className="h-4 w-24 bg-amber-100/60" />
                                <Skeleton className="h-10 w-3/4 bg-amber-100/60" />
                                <div className="flex items-center gap-x-1">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star key={i} className="size-4 text-amber-200" fill="currentColor" />
                                    ))}
                                </div>
                                <Skeleton className="mt-4 h-24 w-full bg-amber-100/60" />
                                <Separator className="my-6 bg-zinc-200" />
                                <div className="flex items-center justify-between">
                                    <Skeleton className="h-8 w-24 bg-amber-100/60" />
                                    <Skeleton className="h-10 w-32 bg-amber-100/60" />
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-y-3 w-full">
                                <h2 className="text-xs font-bold tracking-widest text-amber-800 uppercase">Brand Name</h2>
                                <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-zinc-900">
                                    {product?.name}
                               </h1> 

                                <div className="flex items-center gap-x-3">
                                    <div className="flex items-center text-yellow-500">
                                        {Array.from({ length: 4 }).map((_, i) => (
                                            <Star key={i} className="size-4" fill="currentColor" />
                                        ))}
                                        <Star className="size-4 text-zinc-300" />
                                    </div>
                                    <span className="text-xs sm:text-sm text-zinc-500 font-medium">144 Reviews</span>
                                </div>

                                <p className="mt-2 text-zinc-600 text-sm sm:text-base leading-relaxed">{product?.description}</p>

                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 w-full">
                                        
                                        {/* Form Fields Fieldset Layout */}
                                        <div className="flex flex-col gap-4">
                                            
                                            {/* Address: Takes full width natively */}
                                            <FormField
                                                control={form.control}
                                                name="address"
                                                render={({ field }) => (
                                                    <FormItem className="w-full">
                                                        <FormLabel className="font-semibold text-zinc-700">Delivery Address</FormLabel>
                                                        <FormControl>
                                                            <Textarea
                                                                className="border-zinc-200 bg-white placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-600 focus-visible:ring-offset-0 rounded-lg min-h-[80px]"
                                                                placeholder="e.g. Open street, 55"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage className="text-xs" />
                                                    </FormItem>
                                                )}
                                            />

                                            {/* Sub-inputs row: Stacked on mobile, side-by-side on tablet/desktop */}
                                            <div className="flex flex-col sm:flex-row gap-4 w-full">
                                                {/* Pincode */}
                                                <FormField
                                                    control={form.control}
                                                    name="pincode"
                                                    render={({ field }) => (
                                                        <FormItem className="w-full sm:w-1/2">
                                                            <FormLabel className="font-semibold text-zinc-700">Pincode</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    type="number"
                                                                    className="h-10 border-zinc-200 bg-white placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-600 focus-visible:ring-offset-0 rounded-lg"
                                                                    placeholder="e.g. 567987"
                                                                    {...field}
                                                                />
                                                            </FormControl>
                                                            <FormMessage className="text-xs" />
                                                        </FormItem>
                                                    )}
                                                />

                                                {/* Quantity */}
                                                <FormField
                                                    control={form.control}
                                                    name="qty"
                                                    render={({ field }) => (
                                                        <FormItem className="w-full sm:w-1/2">
                                                            <FormLabel className="font-semibold text-zinc-700">Quantity</FormLabel>
                                                            <FormControl>
                                                                <Input
                                                                    type="number"
                                                                    min={1}
                                                                    className="h-10 border-zinc-200 bg-white placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-600 focus-visible:ring-offset-0 rounded-lg"
                                                                    {...field}
                                                                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 1)}
                                                                />
                                                            </FormControl>
                                                            <FormMessage className="text-xs" />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                        </div>

                                        <Separator className="my-6 bg-zinc-200" />
                                        
                                        {/* Pricing Footer Action Strip */}
                                        <div className="flex items-center justify-between gap-4">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Total Price</span>
                                                <span className="text-2xl sm:text-3xl font-bold text-zinc-900">${price}</span>
                                            </div>

                                            {session ? (
                                                <Button type="submit" disabled={isPending} className="bg-amber-900 hover:bg-amber-800 active:bg-amber-700 text-white font-semibold h-11 px-8 rounded-lg shadow-md transition-all">
                                                    {isPending ? "Placing Order..." : "Buy Now"}
                                                </Button>
                                            ) : (
                                                <Link href={`/api/auth/signin?callbackUrl=${encodeURIComponent(pathname || '/')}`}>
                                                    <Button type="button" className="bg-amber-900 hover:bg-amber-800 text-white font-semibold h-11 px-8 rounded-lg shadow-md">
                                                        Buy Now
                                                    </Button>
                                                </Link>
                                            )}
                                        </div>
                                    </form>
                                </Form>
                            </div>
                        )}
                    </div>

                </div>
            </section>
        </>
    );
};

export default SingleProduct;