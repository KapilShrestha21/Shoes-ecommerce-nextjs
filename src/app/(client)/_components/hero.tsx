import { Button } from '@/components/ui/button';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import React from 'react';

export default function Hero() {
    return (
        <section className="relative min-h-[80vh] w-full overflow-hidden bg-zinc-950 flex items-center py-12 sm:py-20">
            {/* Ambient Background Glows - Muted to smooth amber/zinc values */}
            <div className="absolute top-0 -left-1/4 h-[300px] w-[300px] sm:h-[600px] sm:w-[600px] rounded-full bg-amber-700/5 blur-[100px] sm:blur-[140px] pointer-events-none" />
            <div className="absolute bottom-0 -right-1/4 h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] rounded-full bg-zinc-800/10 blur-[100px] sm:blur-[120px] pointer-events-none" />
            
            {/* Retro Grid Background Pattern Layer */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:3rem_3rem] sm:bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 md:px-12 xl:px-24 z-10">
                {/* Content Layout: Centered completely on mobile devices, clean left-alignment for desktops */}
                <div className="flex flex-col justify-center text-white text-center lg:text-left items-center lg:items-start max-w-3xl mx-auto lg:mx-0">
                    
                    <span className="w-fit rounded-full bg-amber-500/5 px-3 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-amber-500/90 border border-amber-500/10">
                        Limited Release
                    </span>
                    
                    <h1 className="mt-4 text-4xl font-black uppercase tracking-tight sm:text-6xl md:text-7xl xl:text-8xl leading-[1.1] lg:leading-none">
                        Fast Pace. <br />
                        <span className="bg-gradient-to-r from-amber-500 to-zinc-400 bg-clip-text text-transparent">
                            Next Level.
                        </span>
                    </h1>
                    
                    <p className="mt-4 max-w-[540px] text-sm sm:text-base text-zinc-400 md:text-lg xl:text-xl font-light leading-relaxed">
                        Engineered for speed, crafted for comfort. Get our latest high-performance 
                        running silhouettes delivered directly to your doorstep in record time. 
                        Don't just chase your goals—outrun them.
                    </p>
                    
                    {/* Compact responsive buttons for clean small screen viewports */}
                    <div className="mt-8 flex flex-col sm:flex-row w-full sm:w-auto gap-3 sm:gap-4">
                        <Button 
                            className="cursor-pointer bg-amber-600 text-zinc-950 hover:bg-amber-500 font-semibold gap-2 group shadow-lg shadow-amber-900/20 transition-all duration-300
                                       text-xs px-5 h-9 sm:text-base sm:px-8 sm:h-11"
                        >
                            Shop Collection
                            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </Button>
                        <Button 
                            variant="outline" 
                            className="cursor-pointer border-zinc-800 text-black hover:bg-amber-600 font-semibold gap-2
                                       text-xs px-5 h-9 sm:text-base sm:px-8 sm:h-11"
                        >
                            <ShoppingBag className="h-3.5 w-3.5" />
                            View Drops
                        </Button>
                    </div>

                </div>
            </div>
        </section>
    );
}