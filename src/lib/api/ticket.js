import { serverFetch } from "../core/server";

// Public: All Tickets – only approved by default with filters and pagination
export const getTickets = async (params = {}) => {
    const { page = 1, limit = 6, search = '', transportType = '', sort = '' } = params;
    const query = new URLSearchParams({
        page,
        limit,
        status: 'approved', // always show approved
        ...(search && { search }),
        ...(transportType && { transportType }),
        ...(sort && { sort }),
    }).toString();

    return serverFetch(`/api/tickets?${query}`);
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