import { getPendingTickets } from "@/lib/actions/tickets";

import TicketsTable from "./TicketsTable";
import { requireRole } from "@/lib/core/sesson";


export default async function ManageTicketsPage() {
    await requireRole('admin');
    let tickets = [];
    try {
        tickets = await getPendingTickets();
    } catch (error) {
        console.error('Error fetching tickets:', error);
    }
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Manage Tickets</h1>
            <p className="text-gray-500 mb-6">Approve or reject vendor tickets</p>
            <TicketsTable initialTickets={tickets || []} />
        </div>
    );
}