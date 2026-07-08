"use client";

import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { deleteTicket } from '@/lib/actions/tickets';
import { useState } from 'react';

export function DeleteButton({ ticketId, userId, isRejected }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this ticket?')) return;
        setLoading(true);
        try {
            const res = await deleteTicket(ticketId, userId);
            if (res.success) {
                toast.success('Ticket deleted successfully!');
                router.refresh();
            } else {
                toast.error(res.message || 'Delete failed');
            }
        } catch (error) {
            toast.error(error.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isRejected || loading}
            className={`flex-1 text-sm font-medium px-3 py-1.5 rounded-lg transition ${isRejected || loading
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-red-50 text-red-600 hover:bg-red-100'
                }`}
        >
            {loading ? 'Deleting...' : 'Delete'}
        </button>
    );
}