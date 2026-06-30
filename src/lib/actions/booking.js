'use server';

export const createBooking = async(bookingData)=>{
    return serverMutation('/api/bookings', bookingData)
}