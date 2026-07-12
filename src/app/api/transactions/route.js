import { NextResponse } from 'next/server';
import { getUserSession } from '@/lib/core/sesson';
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function GET(req) {
    try {
        const user = await getUserSession();
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId') || user.id;

        await client.connect();
        const db = client.db(process.env.AUTHDB_NAME || 'ticketBari_db');
        const bookingCollection = db.collection('bookings');

        const bookings = await bookingCollection.find({ userId, status: 'paid' })
            .sort({ paidAt: -1 })
            .toArray();

        await client.close();

        const transactions = bookings.map(booking => ({
            transactionId: booking.paymentIntentId || booking._id,
            amount: booking.totalPrice,
            ticketTitle: booking.ticketTitle,
            paymentDate: booking.paidAt || booking.createdAt,
        }));

        return NextResponse.json(transactions);
    } catch (error) {
        console.error('Transaction error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}