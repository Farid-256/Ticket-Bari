import { serverFetch, protectedFetch } from "../core/server";

// Public: All Tickets – only approved by default with filters and pagination
export const getTickets = async (params = {}) => {
    const {
        page = 1,
        limit = 6,
        fromLocation = '',
        toLocation = '',
        transportType = '',
        sort = '',
    } = params;

    const query = new URLSearchParams({
        page,
        limit,
        status: 'approved',
        ...(fromLocation && { fromLocation }),
        ...(toLocation && { toLocation }),
        ...(transportType && { transportType }),
        ...(sort && { sort }),
    }).toString();

    return serverFetch(`/api/tickets?${query}`);
};

// Vendor: Get all tickets (including pending, rejected) – PRIVATE
export const getVendorTickets = async (vendorId) => {
    if (!vendorId) throw new Error('vendorId is required');
    const data = await protectedFetch(`/api/tickets?vendorId=${vendorId}`);
    return Array.isArray(data) ? data : (data?.tickets || []);
};

// Get single ticket (public)
export const getTicketById = async (ticketId) => {
    return serverFetch(`/api/allTickets/${ticketId}`);
};