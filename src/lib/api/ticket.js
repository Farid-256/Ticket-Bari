
// lib/ticket.js
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getVendorTickets = async (vendorId) => {
    if (!vendorId) {
        throw new Error('vendorId is required');
    }
    const res = await fetch(`${baseUrl}/api/tickets?vendorId=${vendorId}`);
    if (!res.ok) {
        throw new Error('Failed to fetch tickets');
    }
    return res.json();
};