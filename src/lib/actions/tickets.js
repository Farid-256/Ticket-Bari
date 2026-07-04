'use server';

import { serverFetch, serverMutation } from '../core/server';

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
    return serverFetch('/api/tickets?status=pending');
};

// approved ticket 
export const getApprovedTickets = async () => {
    return serverFetch('/api/tickets/approved');
};

//advices ticket
export const getAdvertisedTickets = async () => {
    return serverFetch('/api/tickets/advertised');
};

//advice toggle
export const toggleAdvertise = async (ticketId, isAdvertised) => {
    return serverMutation(`/api/tickets/${ticketId}/advertise`, { isAdvertised }, 'PUT');
};