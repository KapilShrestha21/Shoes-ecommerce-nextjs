import React from 'react';

export default function Footer() {
    return (
        <footer className="w-full border-t border-zinc-900 bg-zinc-950 py-6 text-zinc-500">
            <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 sm:px-6 md:px-12 lg:flex-row xl:px-24">
                
                {/* Copyright info */}
                <span className="text-xs font-medium tracking-wide">
                    © {new Date().getFullYear()} Pace. All rights reserved.
                </span>
                
                {/* Minimalist links commonly found on premium brand footers */}
                <div className="flex items-center gap-6 text-[11px] font-medium uppercase tracking-wider">
                    <a href="#privacy" className="transition-colors duration-200 hover:text-zinc-300">Privacy Policy</a>
                    <a href="#terms" className="transition-colors duration-200 hover:text-zinc-300">Terms of Service</a>
                    <a href="#support" className="transition-colors duration-200 hover:text-zinc-300">Support</a>
                </div>

            </div>
        </footer>
    );
}