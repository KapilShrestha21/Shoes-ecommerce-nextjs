"use client"

import * as React from "react"
import Link from "next/link"
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { CommandIcon, HomeIcon, Layers, Warehouse, Users, ShoppingCart, Blocks } from "lucide-react"


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const navItems = [
        { label: "Dashboard", href: "/admin", icon: HomeIcon },
        { label: "Products", href: "/admin/products", icon: Layers },
        { label: "Warehouses", href: "/admin/warehouses", icon: Warehouse },
        { label: "Deliver Person", href: "/admin/delivery-persons", icon: Users },
        { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
        { label: "Inventories", href: "/admin/inventories", icon: Blocks },
    ]
    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:p-1.5!"
                        >
                            <Link href="/">
                                <CommandIcon className="size-5!" />
                                <span className="text-base font-semibold">Acme Inc.</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                {navItems.map((item) => {
                    return (
                        <Link
                        key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        >
                            <item.icon className="h-4 w-4" />
                            {item.label}
                        </Link>
                    )
                })}
            </SidebarContent>
        </Sidebar>
    )
}
