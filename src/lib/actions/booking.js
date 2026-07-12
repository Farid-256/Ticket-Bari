'use server';

import { protectedFetch, serverFetch, serverMutation } from '../core/server';

// Vendor: Get bookings for their tickets (Requested Bookings)
export const getVendorBookings = async (vendorId) => {
    if (!vendorId) throw new Error('vendorId is required');
    return protectedFetch(`/api/bookings?vendorId=${vendorId}`);
};

// Vendor: Update booking status (Accept/Reject)
export const updateBookingStatus = async (bookingId, status) => {
    return serverMutation(`/api/bookings/${bookingId}/status`, { status }, 'PUT');
};

// User: Get own bookings
export const getUserBookings = async (userId) => {
    if (!userId) throw new Error('userId is required');
    return protectedFetch(`/api/bookings?userId=${userId}`);
};

// User: Create booking
export const createBooking = async (bookingData) => {
    return serverMutation('/api/bookings', bookingData);
};