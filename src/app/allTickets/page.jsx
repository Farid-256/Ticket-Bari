import TicketListingContainer from "@/components/Tickets/TicketListingContainer";
import { getTickets } from "@/lib/api/ticket";

export default async function AllTicketsPage() {

    const tickets = await getTickets();

    return (
        <div className="w-full min-h-screen bg-gray-50 p-6 md:p-12">
            <div className="max-w-7xl mx-auto mb-10">
                <h1 className="text-4xl font-bold tracking-tight text-gray-800">All Tickets</h1>
                <p className="text-gray-500 mt-2">Discover your next journey.</p>
            </div>

            <TicketListingContainer initialTickets={tickets || []} />
        </div>
    );
}