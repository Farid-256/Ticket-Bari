'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { updateBookingStatus } from '@/lib/actions/booking';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const RequestedBookingsTable = ({ initialBookings }) => {
    const [bookings, setBookings] = useState(initialBookings);
    const [loading, setLoading] = useState({});
    const router = useRouter();

    const handleStatusUpdate = async (bookingId, status) => {
        setLoading(prev => ({ ...prev, [bookingId]: true }));
        try {
            const result = await updateBookingStatus(bookingId, status);
            if (result.success) {
                toast.success(`Booking ${status} successfully!`);
                setBookings(prev => prev.filter(b => b._id !== bookingId));
                router.refresh();
            } else {
                toast.error(result.message || 'Failed to update status');
            }
        } catch (error) {
            toast.error(error.message || 'Failed to update status');
        } finally {
            setLoading(prev => ({ ...prev, [bookingId]: false }));
        }
    };

    if (bookings.length === 0) {
        return (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <p className="text-gray-500 text-lg">No booking requests yet.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Ticket</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">User</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Quantity</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Total Price</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {bookings.map((booking) => (
                            <tr key={booking._id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        {booking.ticketImage ? (
                                            <div className="relative w-12 h-12 rounded overflow-hidden">
                                                <Image
                                                    src={booking.ticketImage}
                                                    alt={booking.ticketTitle}
                                                    fill
                                                    className="object-cover"
                                                    unoptimized
                                                />
                                            </div>
                                        ) : (
                                            <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">No img</div>
                                        )}
                                        <div>
                                            <p className="font-medium text-gray-900">{booking.ticketTitle}</p>
                                            <p className="text-xs text-gray-500">{booking.fromLocation} → {booking.toLocation}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div>
                                        <p className="font-medium text-gray-900">{booking.userName}</p>
                                        <p className="text-xs text-gray-500">{booking.userEmail}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-600">{booking.bookingQuantity}</td>
                                <td className="px-6 py-4 font-medium text-blue-600">৳{booking.totalPrice}</td>
                                <td className="px-6 py-4">
                                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                        Pending
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-center gap-2">
                                        <button
                                            onClick={() => handleStatusUpdate(booking._id, 'accepted')}
                                            disabled={loading[booking._id]}
                                            className="px-4 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded-lg transition disabled:opacity-50"
                                        >
                                            {loading[booking._id] ? '...' : 'Accept'}
                                        </button>
                                        <button
                                            onClick={() => handleStatusUpdate(booking._id, 'rejected')}
                                            disabled={loading[booking._id]}
                                            className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded-lg transition disabled:opacity-50"
                                        >
                                            {loading[booking._id] ? '...' : 'Reject'}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 text-sm text-gray-500">
                Total requests: {bookings.length}
            </div>
        </div>
    );
};

export default RequestedBookingsTable;