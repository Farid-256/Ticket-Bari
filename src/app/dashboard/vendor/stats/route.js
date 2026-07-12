import { NextResponse } from 'next/server';
import { getUserSession } from '@/lib/core/sesson';
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function GET(req) {
    try {
        const user = await getUserSession();
        if (!user || user.role !== 'vendor') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const vendorId = searchParams.get('vendorId') || user.id;

        await client.connect();
        const db = client.db(process.env.AUTHDB_NAME || 'ticketBari_db');
        const bookingCollection = db.collection('bookings');
        const ticketCollection = db.collection('tickets');

        // 1. Total Revenue
        const revenueAgg = await bookingCollection.aggregate([
            { $match: { vendorId, status: 'paid' } },
            { $group: { _id: null, total: { $sum: '$totalPrice' } } }
        ]).toArray();
        const totalRevenue = revenueAgg.length > 0 ? revenueAgg[0].total : 0;

        // 2. Tickets Sold
        const soldAgg = await bookingCollection.aggregate([
            { $match: { vendorId, status: 'paid' } },
            { $group: { _id: null, totalQty: { $sum: '$bookingQuantity' } } }
        ]).toArray();
        const totalSold = soldAgg.length > 0 ? soldAgg[0].totalQty : 0;

        // 3. Tickets Added
        const totalAdded = await ticketCollection.countDocuments({ vendorId });

        // 4. Monthly Revenue (last 6 months)
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        const monthlyAgg = await bookingCollection.aggregate([
            {
                $match: {
                    vendorId,
                    status: 'paid',
                    paidAt: { $gte: sixMonthsAgo }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: '$paidAt' },
                        month: { $month: '$paidAt' }
                    },
                    revenue: { $sum: '$totalPrice' }
                }
            },
            { $sort: { '_id.year': 1, '_id.month': 1 } }
        ]).toArray();

        const monthlyData = monthlyAgg.map(item => ({
            month: `${new Date(item._id.year, item._id.month - 1).toLocaleString('default', { month: 'short' })} ${item._id.year}`,
            revenue: item.revenue
        }));

        await client.close();

        return NextResponse.json({
            totalRevenue,
            totalSold,
            totalAdded,
            monthlyData
        });
    } catch (error) {
        console.error('Vendor stats error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}