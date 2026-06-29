import { getTicketById } from "@/lib/api/ticket";
import Image from "next/image";
import Link from "next/link";
import BookingModal from "@/components/Tickets/BookingModal";
import CountdownTimer from "@/components/Tickets/CountdownTimer";

const TicketDetails = async ({ params }) => {
    const { id } = await params;
    const ticket = await getTicketById(id);

    if (!ticket) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-12 text-center">
                <h1 className="text-2xl font-bold text-gray-800">Ticket not found</h1>
                <Link href="/allTickets" className="text-blue-600 hover:underline mt-4 inline-block">
                    ← Back to All Tickets
                </Link>
            </div>
        );
    }

    const departureDate = new Date(ticket.departureDate);
    const now = new Date();
    const isExpired = departureDate < now;
    const isSoldOut = ticket.ticketQuantity <= 0;

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            {/* Back Button */}
            <Link href="/allTickets" className="text-blue-600 hover:underline inline-flex items-center gap-1 mb-6">
                ← Back to All Tickets
            </Link>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Left: Image */}
                    <div className="relative md:h-full h-96 bg-gray-100">
                        {ticket.image ? (
                            <Image
                                src={ticket.image}
                                alt={ticket.ticketTitle}
                                fill
                                className="object-cover"
                                unoptimized
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-400">
                                No Image
                            </div>
                        )}
                    </div>

                    {/* Right: Details */}
                    <div className="p-6 space-y-6">
                        <h1 className="text-3xl font-bold text-gray-800">{ticket.ticketTitle}</h1>

                        <div className="flex items-center gap-4 text-gray-600">
                            <span className="font-medium">{ticket.fromLocation}</span>
                            <span className="text-gray-400">→</span>
                            <span className="font-medium">{ticket.toLocation}</span>
                        </div>

                        <div className="flex flex-wrap gap-3 text-sm">
                            <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                                🚍 {ticket.transportType}
                            </span>
                            <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full">
                                ৳{ticket.price} / unit
                            </span>
                            <span className="bg-gray-50 text-gray-700 px-3 py-1 rounded-full">
                                🎫 {ticket.ticketQuantity} left
                            </span>
                        </div>

                        {/* Countdown Timer */}
                        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                            <p className="text-amber-700 text-sm mb-1">Departure in</p>
                            <CountdownTimer targetDate={ticket.departureDate} />
                        </div>

                        {/* Departure Info */}
                        <div className="space-y-1 text-sm text-gray-600">
                            <p>
                                <span className="font-medium">Departure Time:</span>{' '}
                                {new Date(ticket.departureDate).toLocaleString()}
                            </p>
                            {ticket.perks && ticket.perks.length > 0 && (
                                <div>
                                    <span className="font-medium">Perks:</span>{' '}
                                    {ticket.perks.join(', ')}
                                </div>
                            )}
                            <p>
                                <span className="font-medium">Vendor:</span> {ticket.vendorName}
                            </p>
                        </div>

                        {/* Status */}
                        <div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${ticket.status === 'approved' ? 'bg-green-100 text-green-700' :
                                ticket.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                    'bg-yellow-100 text-yellow-700'
                                }`}>
                                {ticket.status?.charAt(0).toUpperCase() + ticket.status?.slice(1)}
                            </span>
                        </div>

                        {/* Booking Modal */}
                        <BookingModal
                            ticket={ticket}
                            isExpired={isExpired}
                            isSoldOut={isSoldOut}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TicketDetails;