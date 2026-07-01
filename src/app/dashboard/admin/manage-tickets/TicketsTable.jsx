'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { updateTicketStatus } from '@/lib/actions/tickets';
import { useRouter } from 'next/navigation';

const TicketsTable = ({ initialTickets }) => {
    const [tickets, setTickets] = useState(initialTickets);
    const [loading, setLoading] = useState({});
    const router = useRouter();

    const handleStatusUpdate = async (ticketId, status) => {
        setLoading(prev => ({ ...prev, [ticketId]: true }));
        try {
            const result = await updateTicketStatus(ticketId, status);
            if (result.success) {
                toast.success(`Ticket ${status} successfully!`);
                // Remove the ticket from the list
                setTickets(prev => prev.filter(t => t._id !== ticketId));
                router.refresh();
            } else {
                toast.error(result.message || 'Failed to update status');
            }
        } catch (error) {
            toast.error(error.message || 'Failed to update status');
        } finally {
            setLoading(prev => ({ ...prev, [ticketId]: false }));
        }
    };

    if (tickets.length === 0) {
        return (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <p className="text-gray-500 text-lg">No pending tickets to review.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Ticket Title
                            </th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Route
                            </th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Vendor
                            </th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {tickets.map((ticket) => (
                            <tr key={ticket._id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    {ticket.ticketTitle}
                                </td>
                                <td className="px-6 py-4 text-gray-600">
                                    {ticket.fromLocation} → {ticket.toLocation}
                                </td>
                                <td className="px-6 py-4 text-gray-600">
                                    {ticket.vendorName || 'N/A'}
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                        Pending
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-center gap-2">
                                        <button
                                            onClick={() => handleStatusUpdate(ticket._id, 'approved')}
                                            disabled={loading[ticket._id]}
                                            className="px-4 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded-lg transition disabled:opacity-50"
                                        >
                                            {loading[ticket._id] ? '...' : 'Approve'}
                                        </button>
                                        <button
                                            onClick={() => handleStatusUpdate(ticket._id, 'rejected')}
                                            disabled={loading[ticket._id]}
                                            className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded-lg transition disabled:opacity-50"
                                        >
                                            {loading[ticket._id] ? '...' : 'Reject'}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 text-sm text-gray-500">
                Total pending: {tickets.length}
            </div>
        </div>
    );
};

export default TicketsTable;