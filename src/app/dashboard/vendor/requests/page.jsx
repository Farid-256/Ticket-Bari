import { getVendorBookings } from "@/lib/actions/booking";
import { requireRole } from "@/lib/core/sesson";
import RequestedBookingsTable from "./RequestedBookingsTable";

export default async function RequestedBookingsPage() {
    const user = await requireRole('vendor');

    let bookings = [];
    try {
        bookings = await getVendorBookings(user.id);
    } catch (error) {
        console.error('Error fetching vendor bookings:', error);
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Requested Bookings</h1>
            <p className="text-gray-500 mb-6">Accept or reject booking requests from users</p>
            <RequestedBookingsTable initialBookings={bookings || []} />
        </div>
    );
}