import { serverFetch } from '../core/server';

export const getUserTransactions = async (userId) => {
    console.log('User ID:', userId);
    const result = await serverFetch(`/api/transactions?userId=${userId}`);
    console.log(result)
    return result
};