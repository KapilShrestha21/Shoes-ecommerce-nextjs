import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import React from 'react';

export default function About() {
    return (
        <section className="max-w-6xl mx-auto px-5 md:py-20 py-14">
            <div className="px-10 py-14 rounded-t-[3rem] bg-gradient-to-b from-gray-200 to-transparent max-w-4xl mx-auto flex justify-center items-center flex-col">
                <div className="flex justify-center items-center gap-5">
                    <Separator className=" bg-amber-900 !h-0.5 !w-20" />
                    <h2 className="text-amber-900 text-3xl font-bold tracking-tight">
                        Special Products
                    </h2>
                    <Separator className="!h-0.5 !w-20 bg-amber-900 " />
                </div>
                <p className="text-center mt-10 w-10/12 text-zinc-600 dark:text-zinc-400 mx-auto">
                    Engineered for ultimate comfort and relentless durability, our latest footwear collection matches your ambition stride for stride. From responsive cushioning to advanced breathable mesh, every detail is crafted to elevate your daily movement. Step into the perfect fusion of innovative sports performance and clean, timeless aesthetic.
                </p>
                <Button className="mt-10 bg-amber-900 hover:bg-amber-800 active:bg-amber-700 px-8">
                    Shop Now
                </Button>
            </div>
        </section>
    );
}