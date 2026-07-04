import { getApprovedTickets } from '@/lib/actions/tickets';
import { requireRole } from '@/lib/core/sesson';
import AdvertiseTable from './AdvertiseTable';

export default async function AdvertiseTicketsPage() {
    await requireRole('admin');

    let tickets = [];
    try {
        tickets = await getApprovedTickets();
    } catch (error) {
        console.error('Error fetching tickets:', error);
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Advertise Tickets</h1>
            <p className="text-gray-500 mb-6">Advertise up to 6 tickets to show on the homepage.</p>
            <AdvertiseTable initialTickets={tickets || []} />
        </div>
    );
}