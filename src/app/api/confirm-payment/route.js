import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import { getUserSession } from '@/lib/core/sesson';
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function POST(req) {
    try {
        const user = await getUserSession();
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { sessionId } = await req.json();
        if (!sessionId) {
            return NextResponse.json({ error: 'sessionId is required' }, { status: 400 });
        }

        // স্ট্রাইপ থেকে সেশন ডিটেইলস
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        const bookingId = session.metadata?.bookingId;

        if (!bookingId) {
            return NextResponse.json({ error: 'No booking ID found' }, { status: 400 });
        }

        await client.connect();
        const db = client.db(process.env.AUTHDB_NAME || 'ticketBari_db');
        const bookingCollection = db.collection('bookings');
        const ticketCollection = db.collection('tickets');

        // বুকিং আপডেট (status → paid)
        const updateResult = await bookingCollection.updateOne(
            { _id: new ObjectId(bookingId) },
            {
                $set: {
                    status: 'paid',
                    paymentIntentId: session.payment_intent,
                    paidAt: new Date(),
                },
            }
        );

        if (updateResult.matchedCount === 0) {
            await client.close();
            return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
        }

        //  টিকেটের quantity কমানো
        const booking = await bookingCollection.findOne({ _id: new ObjectId(bookingId) });
        if (booking && booking.ticketId) {
            await ticketCollection.updateOne(
                { _id: new ObjectId(booking.ticketId) },
                { $inc: { ticketQuantity: -booking.bookingQuantity } }
            );
        }

        await client.close();
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Confirm payment error:', error);
        return NextResponse.json(
            { error: error.message || 'Something went wrong' },
            { status: 500 }
        );
    }
}