'use server';

import { protectedFetch, serverFetch, serverMutation } from '../core/server';

// Vendor: Create ticket
export const creatTicket = async (newTicketData) => {
    return serverMutation('/api/tickets', newTicketData);
};

// Admin: Update ticket status (Approve/Reject)
export const updateTicketStatus = async (ticketId, status) => {
    return serverMutation(`/api/tickets/${ticketId}/status`, { status }, 'PUT');
};

// Admin: Get pending tickets
export const getPendingTickets = async () => {
    return protectedFetch('/api/tickets?status=pending');
};

// approved ticket 
export const getApprovedTickets = async () => {
    return protectedFetch('/api/tickets/approved');
};

//advices ticket
export const getAdvertisedTickets = async () => {
    return serverFetch('/api/tickets/advertised');
};

//advice toggle
export const toggleAdvertise = async (ticketId, isAdvertised) => {
    return serverMutation(`/api/tickets/${ticketId}/advertise`, { isAdvertised }, 'PUT');
}

//latest ticket
export const getLatestTickets = async (limit = 8) => {
    return serverFetch(`/api/tickets/latest?limit=${limit}`);
}

//update ticket
export const updateTicket = async (ticketId, data) => {
    return serverMutation(`/api/tickets/${ticketId}`, data, 'PUT');
};

// Vendor: Delete ticket
export const deleteTicket = async (ticketId, vendorId) => {
    return serverMutation(`/api/tickets/${ticketId}?vendorId=${vendorId}`, {}, 'DELETE');
};