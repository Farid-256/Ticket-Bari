'use server';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const createBooking = async (bookingData) => {
    try {
        const res = await fetch(`${baseUrl}/api/bookings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingData),
        });

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || 'Booking failed');
        }

        return res.json();
    } catch (error) {
        console.error('Booking error:', error);
        throw error;
    }
};