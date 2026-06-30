'use client';

import { useSession } from "@/lib/auth-client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
    House,
    CirclePlus,
    Ticket,
    BookmarkFill,
    FileDollar,
    Bars,
    Persons,
    Megaphone
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { useState } from "react";

export function DashboardSidebar() {
    const pathname = usePathname();
    const { data: session } = useSession();
    const user = session?.user;
    const [mobileOpen, setMobileOpen] = useState(false);

    // USER

    const userNavItems = [
        {
            icon: House,
            href: "/dashboard/user",
            label: "User Profile",
        },
        {
            icon: Ticket,
            href: "/dashboard/user/bookings",
            label: "My Booked Tickets",
        },
        {
            icon: FileDollar,
            href: "/dashboard/user/transactions",
            label: "Transaction History",
        },
    ];


    // VENDOR

    const vendorNavItems = [
        {
            icon: House,
            href: "/dashboard/vendor",
            label: "Vendor Profile",
        },
        {
            icon: CirclePlus,
            href: "/dashboard/vendor/addTicket",
            label: "Add Ticket",
        },
        {
            icon: Ticket,
            href: "/dashboard/vendor/myAddedTicket",
            label: "My Added Tickets",
        },
        {
            icon: BookmarkFill,
            href: "/dashboard/vendor/requests",
            label: "Requested Bookings",
        },
        {
            icon: FileDollar,
            href: "/dashboard/vendor/revenue",
            label: "Revenue Overview",
        },
    ];

    // ADMIN
    const adminNavItems = [
        {
            icon: House,
            href: "/dashboard/admin",
            label: "Admin Profile",
        },
        {
            icon: Ticket,
            href: "/dashboard/admin/tickets",
            label: "Manage Tickets",
        },
        {
            icon: Persons,
            href: "/dashboard/admin/users",
            label: "Manage Users",
        },
        {
            icon: Megaphone,
            href: "/dashboard/admin/advertise",
            label: "Advertise Tickets",
        },
    ];

    // Role → Navigation
    const navMap = {
        user: userNavItems,
        vendor: vendorNavItems,
        admin: adminNavItems,
    };

    const navItems = navMap[user?.role] || userNavItems;

    // ✅ সঠিক isActive – exact match only
    const isActive = (href) => pathname === href;

    const navContent = (
        <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
                const active = isActive(item.href);

                return (
                    <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all
                            ${active
                                ? "bg-blue-50 text-blue-700 font-semibold"
                                : "text-gray-600 hover:bg-gray-100 hover:text-black"
                            }`}
                    >
                        <item.icon
                            className={`size-5 ${active ? "text-blue-700" : "text-gray-400"
                                }`}
                        />

                        <span>{item.label}</span>

                        {active && (
                            <span className="ml-auto h-6 w-1.5 rounded-full bg-blue-600"></span>
                        )}
                    </Link>
                );
            })}
        </nav>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-64 shrink-0 border-r border-gray-200 bg-white p-5">
                <div className="mb-8 border-b pb-4">
                    <p className="text-sm text-gray-500">Welcome,</p>

                    <h3 className="font-semibold text-lg">
                        {user?.name || "Guest"}
                    </h3>

                    <p className="text-xs text-blue-600 uppercase font-medium mt-1">
                        {user?.role || "User"}
                    </p>
                </div>

                {navContent}
            </aside>

            {/* Mobile */}
            <Drawer open={mobileOpen} onOpenChange={setMobileOpen}>
                <Button
                    className="fixed bottom-5 right-5 z-50 rounded-full bg-blue-600 text-white lg:hidden"
                    onClick={() => setMobileOpen(true)}
                >
                    <Bars />
                </Button>

                <Drawer.Backdrop>
                    <Drawer.Content placement="left">
                        <Drawer.Dialog>
                            <Drawer.CloseTrigger />

                            <Drawer.Header>
                                <Drawer.Heading>Dashboard</Drawer.Heading>
                            </Drawer.Header>

                            <Drawer.Body>{navContent}</Drawer.Body>
                        </Drawer.Dialog>
                    </Drawer.Content>
                </Drawer.Backdrop>
            </Drawer>
        </>
    );
}