'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Button, Tooltip } from '@heroui/react';
import { Trash2 } from 'lucide-react';
import { deleteTicket } from '@/lib/actions/tickets';

const DeleteTicketButton = ({ ticketId, vendorId, isRejected }) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this ticket?')) return;

        setLoading(true);
        try {
            const result = await deleteTicket(ticketId, vendorId);
            if (result.success) {
                toast.success(result.message || 'Ticket deleted successfully!');
                router.refresh();
            } else {
                toast.error(result.message || 'Delete failed');
            }
        } catch (error) {
            toast.error(error.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Tooltip content="Delete Ticket">
            <Button
                isIconOnly
                size="sm"
                variant="light"
                color="danger"
                aria-label="Delete ticket"
                isDisabled={isRejected || loading}
                onClick={handleDelete}
            >
                {loading ? (
                    <span className="animate-spin">⌛</span>
                ) : (
                    <Trash2 className="text-danger w-4 h-4" />
                )}
            </Button>
        </Tooltip>
    );
};

export default DeleteTicketButton;