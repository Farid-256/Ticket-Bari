'use server';

import { serverFetch } from '../core/server';

export const getVendorStats = async (vendorId) => {
    if (!vendorId) throw new Error('vendorId is required');
    return serverFetch(`/api/vendor/stats?vendorId=${vendorId}`);
};