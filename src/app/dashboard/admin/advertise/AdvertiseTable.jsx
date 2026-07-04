'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { toggleAdvertise } from '@/lib/actions/tickets';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const AdvertiseTable = ({ initialTickets }) => {
    const [tickets, setTickets] = useState(initialTickets);
    const [loading, setLoading] = useState({});
    const router = useRouter();

    const handleToggle = async (ticketId, currentStatus) => {
        const newStatus = !currentStatus;

        // যদি অ্যাডভার্টাইজ করতে চায় এবং ইতিমধ্যে ৬টি হয়ে থাকে
        if (newStatus) {
            const advertisedCount = tickets.filter(t => t.isAdvertised).length;
            if (advertisedCount >= 6) {
                toast.error('You can advertise maximum 6 tickets at a time.');
                return;
            }
        }

        setLoading(prev => ({ ...prev, [ticketId]: true }));
        try {
            const result = await toggleAdvertise(ticketId, newStatus);
            if (result.success) {
                toast.success(`Ticket ${newStatus ? 'advertised' : 'unadvertised'} successfully!`);
                setTickets(prev => prev.map(t =>
                    t._id === ticketId ? { ...t, isAdvertised: newStatus } : t
                ));
                router.refresh();
            } else {
                toast.error(result.message || 'Failed to update status');
            }
        } catch (error) {
            toast.error(error.message || 'Something went wrong');
        } finally {
            setLoading(prev => ({ ...prev, [ticketId]: false }));
        }
    };

    if (tickets.length === 0) {
        return (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <p className="text-gray-500 text-lg">No approved tickets to advertise.</p>
            </div>
        );
    }

    const advertisedCount = tickets.filter(t => t.isAdvertised).length;

    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="px-6 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                <span className="text-sm text-gray-500">
                    Approved Tickets: {tickets.length} |
                    <span className="ml-2 font-semibold text-blue-600">Advertised: {advertisedCount}/6</span>
                </span>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">#</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Image</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Ticket Title</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Vendor</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Price</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-center">Advertise</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {tickets.map((ticket, index) => (
                            <tr key={ticket._id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 text-gray-500">{index + 1}</td>
                                <td className="px-6 py-4">
                                    {ticket.image ? (
                                        <div className="relative w-12 h-12 rounded overflow-hidden">
                                            <Image src={ticket.image} alt={ticket.ticketTitle} fill className="object-cover" unoptimized />
                                        </div>
                                    ) : (
                                        <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">No img</div>
                                    )}
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900">{ticket.ticketTitle}</td>
                                <td className="px-6 py-4 text-gray-600">{ticket.vendorName || 'N/A'}</td>
                                <td className="px-6 py-4 text-gray-600">৳{ticket.price}</td>
                                <td className="px-6 py-4 text-center">
                                    <button
                                        onClick={() => handleToggle(ticket._id, ticket.isAdvertised || false)}
                                        disabled={loading[ticket._id]}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${ticket.isAdvertised ? 'bg-blue-600' : 'bg-gray-300'
                                            } ${loading[ticket._id] ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                    >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${ticket.isAdvertised ? 'translate-x-6' : 'translate-x-1'
                                                }`}
                                        />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdvertiseTable;