

import { Bars, House,} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import {CirclePlus} from '@gravity-ui/icons';
import {Ticket} from '@gravity-ui/icons';
import {BookmarkFill} from '@gravity-ui/icons';
import {FileDollar} from '@gravity-ui/icons';

export function DashboardSidebar() {
    const navItems = [
        { icon: House, href:'/dashboard/vendor', label: "Profile" },
        { icon: CirclePlus, label: "Add Ticket" },
        { icon: Ticket, label: "My Added Ticket" },
        { icon: BookmarkFill, label: "Requested Bookings" },
        { icon: FileDollar, label: "Revenue" },
    ]

    const navContent = <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
            <button
                key={item.label}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm
                text-foreground transition-colors hover:bg-default"
                type="button">
                <item.icon className="size-5 text-muted" />
                {item.label}
            </button>
        ))}
    </nav>

    return (
        <>
            <aside className="hidden w-64 shrink-0 border-r border-default p-5 lg:block">
                {
                    navContent
                }
            </aside>
            <Drawer>
                <Button className='lg:hidden' variant="secondary">
                    <Bars />
                    Menu
                </Button>
                <Drawer.Backdrop>
                    <Drawer.Content placement="left">
                        <Drawer.Dialog>
                            <Drawer.CloseTrigger />
                            <Drawer.Header>
                                <Drawer.Heading>Navigation</Drawer.Heading>
                            </Drawer.Header>
                            <Drawer.Body>
                                {
                                    navContent
                                }
                            </Drawer.Body>
                        </Drawer.Dialog>
                    </Drawer.Content>
                </Drawer.Backdrop>
            </Drawer>
        </>
    );
}