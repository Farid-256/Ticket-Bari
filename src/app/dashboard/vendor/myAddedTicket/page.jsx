import { getVendorTickets } from '@/lib/api/ticket';
import { getUserSession } from '@/lib/core/sesson';


import Image from 'next/image';
import Link from 'next/link';

const MyAddedTicket = async () => {
    const user = await getUserSession();
    if (!user || user.role !== 'vendor') {
        return <div className="text-center py-12 text-red-500">Access Denied</div>;
    }


    let tickets = [];
    try {
        tickets = await getVendorTickets(user.id);
    } catch (error) {
        console.error('Error fetching tickets:', error);
        return <div className="text-center py-12 text-red-500">Failed to load tickets</div>;
    }

    if (tickets.length === 0) {
        return (
            <div className="max-w-7xl mx-auto p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">My Added Tickets</h1>
                <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                    <p className="text-gray-500 text-lg">You havent added any tickets yet.</p>
                    <Link href="/dashboard/vendor/ticket" className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition">
                        Add Your First Ticket
                    </Link>
                </div>
            </div>
        );
    }


    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">My Added Tickets</h1>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    Total: {tickets.length}
                </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {tickets.map((ticket) => (
                    <div key={ticket._id} className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition">

                        {ticket.image ? (
                            <div className="relative w-full h-64 bg-gray-100">
                                <Image
                                    src={ticket.image}
                                    alt={ticket.ticketTitle}
                                    fill
                                    className="object-contain"
                                    unoptimized
                                />
                            </div>
                        ) : (
                            <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-400">
                                No Image
                            </div>
                        )}

                        <div className="p-4 space-y-2">
                            <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{ticket.ticketTitle}</h3>
                            <p className="text-sm text-gray-500">{ticket.fromLocation} → {ticket.toLocation}</p>
                            <p className="text-sm font-medium text-blue-600">৳{ticket.price} / unit</p>
                            <p className="text-sm text-gray-600">Quantity: {ticket.ticketQuantity}</p>
                            <p className="text-sm text-gray-600">Departure: {new Date(ticket.departureDate).toLocaleString()}</p>
                            <div className="flex flex-wrap gap-1">
                                {ticket.perks?.map((perk) => (
                                    <span key={perk} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">{perk}</span>
                                ))}
                            </div>
                            <div className="mt-2">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${ticket.status === 'approved' ? 'bg-green-100 text-green-700' :
                                    ticket.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                        'bg-yellow-100 text-yellow-700'}`}>
                                    {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                                </span>
                            </div>
                            <div className="flex gap-2 mt-3">
                                <button className={`flex-1 text-sm font-medium px-3 py-1.5 rounded-lg transition ${ticket.status === 'rejected' ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`} disabled={ticket.status === 'rejected'}>
                                    Update
                                </button>
                                <button className={`flex-1 text-sm font-medium px-3 py-1.5 rounded-lg transition ${ticket.status === 'rejected' ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-red-50 text-red-600 hover:bg-red-100'}`} disabled={ticket.status === 'rejected'}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyAddedTicket;