const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getBookingsByUser = async (userId) => {
    if (!userId) throw new Error('userId is required');
    return protectedFetch(`/api/bookings?userId=${userId}`);
};

export const createBooking = async (bookingData) => {
    const res = await fetch(`${baseUrl}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
    });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Booking failed');
    }
    return res.json();
}