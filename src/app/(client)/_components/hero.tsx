import { Button } from '@/components/ui/button';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import React from 'react';

export default function Hero() {
    return (
        <section className="relative min-h-[85vh] sm:min-h-[80vh] w-full overflow-hidden bg-zinc-950 flex items-center py-16 sm:py-20">
            {/* Ambient Background Glows - Tuned sizes for smaller viewports */}
            <div className="absolute top-0 -left-1/4 h-[250px] w-[250px] sm:h-[600px] sm:w-[600px] rounded-full bg-amber-700/10 blur-[80px] sm:blur-[140px] pointer-events-none" />
            <div className="absolute bottom-0 -right-1/4 h-[250px] w-[250px] sm:h-[500px] sm:w-[500px] rounded-full bg-zinc-800/20 blur-[80px] sm:blur-[120px] pointer-events-none" />
            
            {/* Retro Grid Background Pattern Layer */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] sm:bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_60%,transparent_100%)] opacity-20 pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 md:px-12 xl:px-24 z-10">
                {/* Content Layout: Centered completely on mobile, cleanly aligned left on desktop */}
                <div className="flex flex-col justify-center text-white text-center lg:text-left items-center lg:items-start max-w-3xl mx-auto lg:mx-0">
                    
                    <span className="w-fit rounded-full bg-amber-500/10 px-3 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-amber-500 border border-amber-500/20">
                        Limited Release
                    </span>
                    
                    {/* Typography: Softened mobile size step, removed aggressive mobile line break */}
                    <h1 className="mt-4 text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-black uppercase tracking-tight leading-[1.15] sm:leading-[1.1] lg:leading-none">
                        Fast Pace. <br className="hidden sm:inline" />
                        <span className="bg-gradient-to-r from-amber-500 via-amber-400 to-zinc-400 bg-clip-text text-transparent">
                            Next Level.
                        </span>
                    </h1>
                    
                    <p className="mt-4 max-w-[540px] text-zinc-400 text-sm sm:text-base md:text-lg xl:text-xl font-light leading-relaxed px-2 sm:px-0">
                        Engineered for speed, crafted for comfort. Get our latest high-performance 
                        running silhouettes delivered directly to your doorstep in record time. 
                        Don't just chase your goals—outrun them.
                    </p>
                    
                    {/* Interactive Button Wrapper: Stacked cleanly on mobile viewports */}
                    <div className="mt-8 flex flex-col sm:flex-row w-full sm:w-auto gap-3 sm:gap-4 px-4 sm:px-0">
                        <Button 
                            className="w-full sm:w-auto cursor-pointer bg-amber-600 text-zinc-950 hover:bg-amber-500 font-semibold gap-2 group shadow-lg shadow-amber-900/20 transition-all duration-300
                                       text-sm h-11 sm:text-base sm:px-8 sm:h-11"
                        >
                            Shop Collection
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                        <Button 
                            variant="outline" 
                            className="w-full sm:w-auto cursor-pointer border-zinc-800 bg-transparent text-zinc-200 hover:text-zinc-950 hover:bg-zinc-100 hover:border-zinc-100 font-semibold gap-2 transition-all duration-200
                                       text-sm h-11 sm:text-base sm:px-8 sm:h-11"
                        >
                            <ShoppingBag className="h-4 w-4" />
                            View Drops
                        </Button>
                    </div>

                </div>
            </div>
        </section>
    );
}