'use client';

import { useState } from 'react';
import { useSession } from '@/lib/auth-client';
import { toast } from 'react-toastify';
import { createBooking } from '@/lib/actions/booking';

const BookingModal = ({ ticket, isExpired, isSoldOut }) => {
    const { data: session } = useSession();
    const user = session?.user;
    const [isOpen, setIsOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);


    const isDisabled = isExpired || isSoldOut || !user;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            toast.error('Please login to book tickets');
            return;
        }

        if (quantity < 1) {
            toast.error('Minimum quantity is 1');
            return;
        }

        if (quantity > ticket.ticketQuantity) {
            toast.error(`Only ${ticket.ticketQuantity} tickets available`);
            return;
        }

        setLoading(true);
        try {
            const bookingData = {
                ticketId: ticket._id,
                ticketTitle: ticket.ticketTitle,
                ticketImage: ticket.image,
                fromLocation: ticket.fromLocation,
                toLocation: ticket.toLocation,
                departureDate: ticket.departureDate,
                price: ticket.price,
                bookingQuantity: quantity,
                totalPrice: ticket.price * quantity,
                userId: user.id,
                userName: user.name,
                userEmail: user.email,
                vendorId: ticket.vendorId,
                vendorName: ticket.vendorName,
                status: 'pending',
            };

            const result = await createBooking(bookingData);
            if (result.insertedId) {
                toast.success('Booking request sent! Waiting for vendor approval.');
                setIsOpen(false);
                setQuantity(1);
            } else {
                toast.error('Booking failed. Please try again.');
            }
        } catch (error) {
            toast.error(error.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Book Now Button */}
            <button
                onClick={() => setIsOpen(true)}
                disabled={isDisabled || loading}
                className={`w-full py-3 rounded-lg font-semibold transition ${isDisabled
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
            >
                {!user ? 'Login to Book' :
                    isExpired ? 'Departure Passed' :
                        isSoldOut ? 'Sold Out' :
                            'Book Now'}
            </button>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-gray-800">Book Ticket</h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-gray-600 text-2xl"
                            >
                                ×
                            </button>
                        </div>

                        <div className="space-y-3 text-sm text-gray-600 mb-4">
                            <p><span className="font-medium">Ticket:</span> {ticket.ticketTitle}</p>
                            <p><span className="font-medium">Price:</span> ৳{ticket.price} / unit</p>
                            <p><span className="font-medium">Available:</span> {ticket.ticketQuantity}</p>
                            <p><span className="font-medium">Total:</span> ৳{ticket.price * quantity}</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Quantity
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    max={ticket.ticketQuantity}
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.min(
                                        parseInt(e.target.value) || 1,
                                        ticket.ticketQuantity
                                    ))}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 
                                    focus:border-blue-500 outline-none"
                                />
                                <p className="text-xs text-gray-400 mt-1">Max: {ticket.ticketQuantity}</p>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition 
                                disabled:opacity-50"
                            >
                                {loading ? 'Booking...' : `Confirm Booking (৳${ticket.price * quantity})`}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default BookingModal;