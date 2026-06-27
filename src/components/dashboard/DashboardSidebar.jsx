'use client';

import { useSession } from "@/lib/auth-client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
    House, CirclePlus, Ticket, BookmarkFill, FileDollar,
    Bars
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { useState } from "react";

export function DashboardSidebar() {
    const pathname = usePathname();
    const { data: session } = useSession();
    const user = session?.user;
    const [mobileOpen, setMobileOpen] = useState(false);

    // Role-based navigation items
    const navItems = [
        { icon: House, href: '/dashboard/vendor', label: "Profile" },
        { icon: CirclePlus, href: '/dashboard/vendor/addTicket', label: "Add Ticket" },
        { icon: Ticket, href: '/dashboard/vendor/myAddedTicket', label: "My Added Ticket" },
        { icon: BookmarkFill, href: '/dashboard/vendor/requests', label: "Requested Bookings" },
        { icon: FileDollar, href: '/dashboard/vendor/revenue', label: "Revenue" },
    ];

    const isActive = (href) => {
        if (href === '/dashboard/vendor') {
            return pathname === href;
        }
        return pathname.startsWith(href);
    };

    const navContent = (
        <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                    <Link
                        key={item.label}
                        href={item.href}
                        className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${active
                                ? 'bg-blue-50 text-blue-700 font-medium'
                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                            }`}
                        onClick={() => setMobileOpen(false)}
                    >
                        <item.icon className={`size-5 ${active ? 'text-blue-700' : 'text-gray-400'}`} />
                        {item.label}
                        {active && (
                            <span className="ml-auto w-1.5 h-6 bg-blue-600 rounded-full"></span>
                        )}
                    </Link>
                );
            })}
        </nav>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden w-64 shrink-0 border-r border-gray-200 bg-white p-5 lg:block">
                <div className="mb-6 px-2">
                    <p className="text-sm text-gray-500">Welcome back,</p>
                    <p className="text-lg font-semibold text-gray-800">{user?.name || 'Guest'}</p>
                    <p className="text-xs text-gray-400 capitalize">{user?.role || 'vendor'}</p>
                </div>
                {navContent}
            </aside>

            {/* Mobile Drawer */}
            <Drawer>
                <Button
                    className='lg:hidden fixed bottom-4 right-4 z-50 rounded-full shadow-lg bg-blue-600 text-white'
                    variant="solid"
                    onClick={() => setMobileOpen(!mobileOpen)}
                >
                    <Bars size={24} />
                </Button>
                <Drawer.Backdrop>
                    <Drawer.Content placement="left">
                        <Drawer.Dialog>
                            <Drawer.CloseTrigger />
                            <Drawer.Header>
                                <Drawer.Heading>Navigation</Drawer.Heading>
                            </Drawer.Header>
                            <Drawer.Body>
                                {navContent}
                            </Drawer.Body>
                        </Drawer.Dialog>
                    </Drawer.Content>
                </Drawer.Backdrop>
            </Drawer>
        </>
    );
}