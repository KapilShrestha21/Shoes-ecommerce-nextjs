import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import React from 'react';

export default function NewsLetter() {
    return (
        <section className="mx-auto max-w-6xl px-4 sm:px-5 py-10 md:py-20">
            <div className="relative mx-auto flex max-w-4xl flex-col items-center justify-center rounded-[2rem] sm:rounded-3xl px-5 sm:px-10 py-12 md:py-14 text-white overflow-hidden">
                
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-center px-2">
                    Stay Updated with Newsletter
                </h2>
                
                <p className="mt-4 md:mt-6 w-full sm:w-10/12 md:w-8/12 text-center text-sm sm:text-base text-zinc-200 px-2 sm:px-0">
                    Get the latest news, exclusive offers, and drops delivered right to
                    your inbox with our high-performance footwear collection updates.
                </p>
                
                {/* Responsive Form Wrapper */}
                <div className="relative w-full max-w-md mt-8 px-2 sm:px-0"> 
                    <div className="flex flex-col sm:flex-row items-stretch w-full gap-3 sm:gap-0 sm:relative">
                        <Input
                            type="email"
                            className="w-full h-11 sm:h-10 pr-4 sm:pr-24 border-zinc-800 bg-zinc-900/60 text-white placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500 focus-visible:ring-offset-0 rounded-xl sm:rounded-md"
                            placeholder="Enter your email address"
                        />
                        <Button
                            variant="secondary"
                            className="cursor-pointer h-11 sm:h-8 w-full sm:w-auto sm:absolute sm:right-1 sm:top-1/2 sm:-translate-y-1/2 bg-white font-semibold text-zinc-950 hover:bg-amber-500 active:bg-amber-400 rounded-xl sm:rounded-md text-sm shadow-md"
                            size="sm"
                        >
                            Subscribe
                        </Button>
                    </div>
                </div>
                
                {/* Background Adjustments */}
                <Image
                    src="/bg-shoe.jpg"
                    alt="Newsletter Footwear Background"
                    fill
                    sizes="(max-w-4xl) 100vw, 896px"
                    priority
                    className="-z-10 object-cover"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/75 via-black/70 to-black/80" />
            </div>
        </section>
    );
}