'use server';

import { serverFetch } from '../core/server';

export const getUserTransactions = async (userId) => {
    if (!userId) throw new Error('userId required');
    return serverFetch(`/api/transactions?userId=${userId}`);
}