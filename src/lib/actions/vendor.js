'use server';
import { protectedFetch } from '../core/server';

export const getVendorStats = async (vendorId) => {
    if (!vendorId) throw new Error('vendorId required');
    return protectedFetch(`/api/vendor/stats?vendorId=${vendorId}`);
};