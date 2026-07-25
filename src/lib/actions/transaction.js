import { serverFetch } from '../core/server';

export const getUserTransactions = async (userId) => {
    return serverFetch(`/api/transactions?userId=${userId}`);
};