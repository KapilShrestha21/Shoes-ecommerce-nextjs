'use client';

import { cn } from '@/lib/utils';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut, LogIn, User } from 'lucide-react';

export default function Header() {
    const pathname = usePathname();
    const { data: session, status } = useSession();

    const navItems = [
        { label: 'Home', href: '/' },
        { label: 'Best Selling', href: '/best-selling' },
        { label: 'Offers', href: '/offers' },
        { label: 'Orders', href: '/account/orders' },
    ];

    return (
        <header className="w-full border-b border-zinc-900 bg-white">
            {/* Top Announcement Bar - Premium Dark Theme */}
            <div className="flex h-9 items-center justify-center bg-amber-600 px-4 text-center text-zinc-950 font-medium">
                <span className="text-xs tracking-wide">
                    Limited Run: Use code <span className="font-bold">NEXTLEVEL</span> for free express shipping on all drops today!
                </span>
            </div>
            
            {/* Main Navigation */}
            <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Brand Logo Placeholder */}
                <div className="flex items-center">
                    <Link href="/" className="text-xl font-black uppercase tracking-wider text-amber">
                        Pace<span className="text-amber-500">.</span>
                    </Link>
                </div>

                {/* Nav Links Stack */}
                <ul className="flex items-center gap-6 sm:gap-8">
                    {navItems.map((item) => (
                        <li key={item.href}>
                            <Link 
                                href={item.href}
                                className={cn(
                                    'text-sm font-medium tracking-wide text-amber-400 transition-colors duration-200 hover:text-amber-500',
                                    pathname === item.href && 'font-bold text-amber-500'
                                )}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                    
                    {/* Authentication CTA Link */}
                    <li className="border-l border-zinc-800 pl-4 sm:pl-6">
                        {status === 'authenticated' ? (
                            <button 
                                onClick={() => signOut()}
                                className="flex items-center gap-1.5 text-sm font-medium text-zinc-400 transition-colors duration-200 hover:text-red-400"
                            >
                                <LogOut className="h-4 w-4" />
                                <span className="cursor-pointer hidden sm:inline">Logout</span>
                            </button>
                        ) : (
                            <Link 
                                href="/api/auth/signin"
                                className="flex items-center gap-1.5 text-sm font-medium text-zinc-400 transition-colors duration-200 hover:text-amber-500"
                            >
                                <LogIn className="h-4 w-4" />
                                <span className="cursor-pointer hidden sm:inline">Sign In</span>
                            </Link>
                        )}
                    </li>
                </ul>
            </nav>
        </header>
    );
}