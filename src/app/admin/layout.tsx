import Link from 'next/link';
import {
    CircleUser,
    Menu,
    Package2,
    ShoppingCart,
    Users,
    Layers,
    Warehouse,
    Blocks,
    Home as HomeIcon,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Sidebar from './_components/sidebar';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/authOptions';
import Signout from './_components/signout';

// Centralized navigation items — preserved exactly as requested
const navItems = [
    { label: 'Dashboard', href: '/admin', icon: HomeIcon },
    { label: 'Products', href: '/admin/products', icon: Layers },
    { label: 'Warehouses', href: '/admin/warehouses', icon: Warehouse },
    { label: 'Deliver Persons', href: '/admin/delivery-persons', icon: Users },
    { label: 'Orders', href: '/admin/orders', icon: ShoppingCart },
    { label: 'Inventories', href: '/admin/inventories', icon: Blocks },
];

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
    const session = await getServerSession(authOptions);
    console.log('Server session', session);

    return (
        <div className="grid min-h-screen w-full bg-zinc-50 text-zinc-900 md:grid-cols-[220px_1fr] lg:grid-cols-[260px_1fr]">
            {/* Desktop Left-Hand Sidebar Panel */}
            <Sidebar />

            <div className="flex flex-col">
                {/* Global Dashboard Sticky Header */}
                <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b border-zinc-200 bg-white/80 px-4 backdrop-blur-md lg:h-[60px] lg:px-6 shadow-sm">

                    {/* Mobile Navigation Sheet Trigger Container */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon" className="shrink-0 border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 md:hidden">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="flex flex-col border-r border-zinc-200 bg-white p-6 text-zinc-800">
                            <div className="flex items-center gap-2 pb-6 border-b border-zinc-100">
                                <Package2 className="h-6 w-6 text-amber-500" />
                                <span className="font-bold text-lg tracking-tight text-zinc-900">Store Admin</span>
                            </div>

                            {/* Dynamically mapped navigation resolving your mobile screens todo item */}
                            <nav className="mt-6 grid gap-1.5 text-base font-medium">
                                {navItems.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <Link
                                            key={item.label}
                                            href={item.href}
                                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-zinc-500 transition-all hover:bg-zinc-50 hover:text-amber-600 font-medium"
                                        >
                                            <Icon className="h-5 w-5" />
                                            <span>{item.label}</span>
                                        </Link>
                                    );
                                })}
                            </nav>
                        </SheetContent>
                    </Sheet>

                    {/* Admin Identity Status Badge */}
                    <div className="w-full flex-1">
                        <Badge variant="outline" className="border-amber-500/30 bg-amber-50/50 font-medium text-amber-700">
                            You are an admin
                        </Badge>
                    </div>

                    {/* Authenticated Profile Dropdown Action Menu */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900">
                                <CircleUser className="h-5 w-5" />
                                <span className="sr-only">Toggle user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 border-zinc-200 bg-white text-zinc-800 shadow-md">
                            <DropdownMenuLabel className="text-zinc-500 font-normal text-xs px-2 py-1.5">
                                My Account <span className="block font-medium text-zinc-400 mt-0.5 truncate">{session?.user?.email || ''}</span>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-zinc-100" />
                            <DropdownMenuItem className="focus:bg-zinc-50 focus:text-zinc-900 cursor-pointer">Settings</DropdownMenuItem>
                            <DropdownMenuItem className="focus:bg-zinc-50 focus:text-zinc-900 cursor-pointer">Support</DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-zinc-100" />
                            {session && (
                                <DropdownMenuItem className="p-0 focus:bg-red-50">
                                    <Signout>
                                        <div className="w-full text-left px-2 py-1.5 text-red-600 hover:text-red-700 font-medium">
                                            Logout
                                        </div>
                                    </Signout>
                                </DropdownMenuItem>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>

                {/* Core Children Content Space */}
                <main className="flex flex-1 flex-col gap-6 p-4 md:p-6 lg:p-8 max-w-7xl w-full mx-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;