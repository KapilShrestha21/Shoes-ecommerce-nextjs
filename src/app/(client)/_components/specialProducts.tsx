import { Separator } from '@/components/ui/separator';
import Image from 'next/image';

export default function SpecialProducts() {
    const products = [
        { src: '/shoe1.avif', alt: 'product1', name: 'Air Jordan 1 Retro Low OG' },
        { src: '/shoe2.avif', alt: 'product2', name: 'Nike Air Force 1' },
        { src: '/shoe3.avif', alt: 'product3', name: 'Air Jordan 12 Retro' },
        { src: '/shoe4.avif', alt: 'product2', name: 'Air Jordan 1 Mid SE Edge' },
    ];

    return (
        <section className="mx-auto max-w-6xl px-4 sm:px-5 py-12 md:py-20">
            {/* Responsive Header Section */}
            <div className="flex items-center justify-center gap-3 sm:gap-5 w-full">
                <Separator className="bg-amber-900 !h-0.5 w-12 sm:w-20 hidden xs:block" />
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-amber-900 text-center">
                    Special Products
                </h2>
                <Separator className="!h-0.5 w-12 sm:w-20 bg-amber-900 hidden xs:block" />
            </div>
            
            {/* Responsive Grid: Changed grid-cols-1 to grid-cols-2 and reduced mobile gaps */}
            <div className="mt-10 md:mt-20 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-8 md:grid-cols-3 lg:grid-cols-4">
                {products.map((product, index) => (
                    <div key={index} className="flex flex-col items-center justify-start gap-3 text-center group">
                        
                        {/* Fluid Circle Container for the Image */}
                        <div className="relative aspect-square w-full max-w-[160px] sm:max-w-[220px] overflow-hidden rounded-full border-4 sm:border-8 border-white shadow-md transition-transform duration-300 group-hover:scale-105">
                            <Image
                                src={product.src}
                                alt={product.alt}
                                fill
                                sizes="(max-w-640px) 40vw, 220px"
                                className="object-cover"
                            />
                        </div>
                        
                        {/* Title text scales dynamically and remains contained */}
                        <p className="font-semibold text-amber-900 text-xs sm:text-base mt-2 px-1 line-clamp-2 max-w-[180px]">
                            {product.name}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}