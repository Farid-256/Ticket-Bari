import { getUserSession } from "@/lib/core/sesson";
import { getBookingsByUser } from "@/lib/api/booking";
import Image from "next/image";
import Link from "next/link";

const BookingTickets = async () => {
    const user = await getUserSession();
    if (!user) {
        return <div className="text-center py-10">Please login to view your bookings.</div>;
    }

    let bookings = [];
    try {
        bookings = await getBookingsByUser(user.id);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        return <div className="text-center py-10 text-red-500">Failed to load bookings.</div>;
    }

    if (bookings.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-10 text-center">
                <h1 className="text-2xl font-bold text-gray-800">My Booked Tickets</h1>
                <p className="text-gray-500 mt-4">You havent booked any tickets yet.</p>
                <Link href="/allTickets" className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                    Browse Tickets
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">My Booked Tickets</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookings.map((booking) => (
                    <div key={booking._id} className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition flex flex-col">
                        {/* Image */}
                        {booking.ticketImage ? (
                            <div className="relative w-full h-48 bg-gray-100">
                                <Image
                                    src={booking.ticketImage}
                                    alt={booking.ticketTitle}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            </div>
                        ) : (
                            <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400">
                                No Image
                            </div>
                        )}

                        <div className="p-4 flex flex-col flex-1">
                            <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
                                {booking.ticketTitle}
                            </h3>
                            <p className="text-sm text-gray-500">
                                {booking.fromLocation} → {booking.toLocation}
                            </p>
                            <p className="text-sm font-medium text-blue-600 mt-1">
                                {booking.totalPrice} Taka (Qty: {booking.bookingQuantity})
                            </p>
                            <p className="text-sm text-gray-600">
                                Departure: {new Date(booking.departureDate).toLocaleString()}
                            </p>
                            <div className="mt-2">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${booking.status === 'approved' ? 'bg-green-100 text-green-700' :
                                    booking.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                        'bg-yellow-100 text-yellow-700'
                                    }`}>
                                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                </span>
                            </div>
                            {/* "Pay Now" button (if accepted) */}
                            {booking.status === 'accepted' && (
                                <form action="/api/checkout_sessions" method="POST">
                                    <section>
                                        <button className="mt-3 inline-block text-center bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition" type="submit" role="link">
                                            Checkout
                                        </button>
                                    </section>
                                </form>

                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookingTickets;