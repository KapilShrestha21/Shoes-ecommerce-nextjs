import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import React from 'react';

export default function About() {
    return (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-20">
            <div className="px-4 sm:px-10 py-10 md:py-14 rounded-t-[2rem] sm:rounded-t-[3rem] bg-gradient-to-b from-gray-200 to-transparent max-w-4xl mx-auto flex justify-center items-center flex-col">
                
                {/* Heading Wrapper: Stack items on small screens if they run out of room */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-5 w-full">
                    <Separator className="bg-amber-900 !h-0.5 w-12 sm:w-20 hidden xs:block" />
                    <h2 className="text-amber-900 text-2xl sm:text-3xl font-bold tracking-tight text-center">
                        Special Products
                    </h2>
                    <Separator className="!h-0.5 w-12 sm:w-20 bg-amber-900 hidden xs:block" />
                </div>
                
                {/* Paragraph: Fluid width for mobile, transitions to tighter layout on desktop */}
                <p className="text-center mt-6 md:mt-10 w-full sm:w-11/12 md:w-10/12 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mx-auto leading-relaxed">
                    Engineered for ultimate comfort and relentless durability, our latest footwear collection matches your ambition stride for stride. From responsive cushioning to advanced breathable mesh, every detail is crafted to elevate your daily movement. Step into the perfect fusion of innovative sports performance and clean, timeless aesthetic.
                </p>
                
                <Button className="mt-8 md:mt-10 bg-amber-900 hover:bg-amber-800 active:bg-amber-700 px-8 w-full sm:w-auto">
                    Shop Now
                </Button>
            </div>
        </section>
    );
}