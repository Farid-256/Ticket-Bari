'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { updateTicketStatus } from '@/lib/actions/tickets';
import Image from 'next/image';

export default function AdminTicketTable({ tickets }) {
    const [localTickets, setLocalTickets] = useState(tickets);

    const handleStatusChange = async (ticketId, newStatus) => {
        try {
            await updateTicketStatus(ticketId, newStatus);
            setLocalTickets(prev => prev.filter(t => t._id !== ticketId));
            toast.success(`Ticket ${newStatus} successfully!`);
        } catch {
            toast.error('Failed to update status');
        }
    };

    if (localTickets.length === 0) {
        return <p className="text-gray-500">No pending tickets.</p>;
    }

    return (
        <div className="overflow-x-auto bg-white rounded-xl shadow border">
            <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 border-b">
                    <tr>
                        <th className="px-4 py-3">Image</th>
                        <th className="px-4 py-3">Title</th>
                        <th className="px-4 py-3">Route</th>
                        <th className="px-4 py-3">Vendor</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {localTickets.map(ticket => (
                        <tr key={ticket._id} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-3">
                                {ticket.image ? (
                                    <Image src={ticket.image} alt={ticket.ticketTitle} width={40} height={40} className="rounded object-cover" unoptimized />
                                ) : (
                                    <div className="w-10 h-10 bg-gray-200 rounded" />
                                )}
                            </td>
                            <td className="px-4 py-3 font-medium">{ticket.ticketTitle}</td>
                            <td className="px-4 py-3">{ticket.fromLocation} → {ticket.toLocation}</td>
                            <td className="px-4 py-3">{ticket.vendorName || 'N/A'}</td>
                            <td className="px-4 py-3">
                                <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">Pending</span>
                            </td>
                            <td className="px-4 py-3 text-center">
                                <button
                                    onClick={() => handleStatusChange(ticket._id, 'approved')}
                                    className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1.5 rounded mr-2"
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() => handleStatusChange(ticket._id, 'rejected')}
                                    className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1.5 rounded"
                                >
                                    Reject
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}