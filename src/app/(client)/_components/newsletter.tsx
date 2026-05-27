import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import React from 'react';

export default function NewsLetter() {
    return (
        <section className="mx-auto max-w-6xl px-5 py-14 md:py-20">
            <div className="relative mx-auto flex max-w-4xl flex-col items-center justify-center rounded-3xl px-10 py-14 text-white">
                <h2 className="text-3xl font-bold tracking-tight">Stay Updated with Newsletter</h2>
                <p className="mt-6 w-8/12 text-center">
                    Get the latest news, exclusive offers, and delicious updates delivered right to
                    your inbox with our chocolate and cake shop newsletter.
                </p>
                <div className="relative w-full max-w-md"> {/* Parent wrapper acts as the anchor point */}
    <Input
        type="email"
        className="w-full pr-24 border-zinc-800 bg-zinc-900/50 text-white placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-500 focus-visible:ring-offset-0"
        placeholder="Enter your email address"
    />
    <Button
        variant="secondary"
        className="cursor-pointer absolute right-1 top-1/2 h-8 -translate-y-1/2 bg-white font-semibold text-zinc-950 hover:bg-amber-500 active:bg-amber-400"
        size="sm"
    >
        Subscribe
    </Button>
</div>
                <Image
                    src="/bg-shoe.jpg"
                    alt="Hero Chololate"
                    fill
                    className="-z-10 rounded-3xl object-cover"
                />
                <div className="absolute inset-0 -z-10 rounded-3xl bg-black/70" />
            </div>
        </section>
    );
}