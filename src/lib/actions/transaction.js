'use server';

import { protectedFetch } from '../core/server';

export const getUserTransactions = async (userId) => {
    if (!userId) throw new Error('userId required');
    return protectedFetch(`/api/transactions?userId=${userId}`);
}