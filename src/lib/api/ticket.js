import { serverFetch } from "../core/server";

// Public: All Tickets – only approved by default
export const getTickets = async (status = 'approved') => {
    const url = status ? `/api/tickets?status=${status}` : '/api/tickets';
    return serverFetch(url);
};

// Vendor: Get all tickets (including pending, rejected)
export const getVendorTickets = async (vendorId) => {
    if (!vendorId) throw new Error('vendorId is required');
    return serverFetch(`/api/tickets?vendorId=${vendorId}`);
};

// Get single ticket
export const getTicketById = async (ticketId) => {
    return serverFetch(`/api/allTickets/${ticketId}`);
};