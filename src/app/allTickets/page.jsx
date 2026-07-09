import TicketListingContainer from "@/components/Tickets/TicketListingContainer";
import { getTickets } from "@/lib/api/ticket";

export default async function AllTicketsPage({ searchParams }) {
    const params = await searchParams;
    const page = parseInt(params.page) || 1;
    const limit = 6;
    const search = params.search || '';
    const transportType = params.transportType || '';
    const sort = params.sort || '';

    let data = { tickets: [], total: 0, totalPages: 1, page: 1 };
    try {
        data = await getTickets({ page, limit, search, transportType, sort });
    } catch (error) {
        console.error('Error fetching tickets:', error);
    }

    return (
        <div className="w-full min-h-screen bg-gray-50 p-6 md:p-12">
            <div className="max-w-7xl mx-auto mb-10">
                <h1 className="text-4xl font-bold tracking-tight text-gray-800">All Tickets</h1>
                <p className="text-gray-500 mt-2">Discover your next journey.</p>
            </div>
            <TicketListingContainer
                initialTickets={data.tickets || []}
                total={data.total || 0}
                totalPages={data.totalPages || 1}
                currentPage={data.page || 1}
                filters={{ search, transportType, sort }}
            />
        </div>
    );
}