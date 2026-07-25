import { serverFetch } from "../core/server";


// Public: All Tickets – only approved by default with filters and pagination
export const getTickets = async (params = {}) => {
    const {
        page = 1,
        limit = 6,
        fromLocation = '',
        toLocation = '',
        transportType = '',
        sort = '',
        status = 'approved'
    } = params;

    const query = new URLSearchParams({
        page,
        limit,
        ...(status && { status }),
        ...(fromLocation && { fromLocation }),
        ...(toLocation && { toLocation }),
        ...(transportType && { transportType }),
        ...(sort && { sort }),
    }).toString();

    return serverFetch(`/api/tickets?${query}`);
};

// Vendor: Get all tickets (including pending, rejected) – PRIVATE(updated)
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
export const getVendorTickets = async (vendorId) => {
    const res = await fetch(`${baseUrl}/api/tickets?vendorId=${vendorId}`)
    return res.json()
}

// Get single ticket (public)
export const getTicketById = async (ticketId) => {
    return serverFetch(`/api/allTickets/${ticketId}`);
};