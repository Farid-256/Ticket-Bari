import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import { getUserSession } from '@/lib/core/sesson';

export async function POST(req) {
    try {
        const headersList = await headers();
        const origin = headersList.get('origin');
        const user = await getUserSession();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const formData = await req.formData();
        const bookingId = formData.get('bookingId');

        if (!bookingId) {
            return NextResponse.json({ error: 'bookingId is required' }, { status: 400 });
        }


        const { MongoClient, ObjectId } = require('mongodb');
        const client = new MongoClient(process.env.MONGODB_URI);
        await client.connect();
        const db = client.db(process.env.AUTHDB_NAME || 'ticketBari_db');
        const bookingCollection = db.collection('bookings');
        const booking = await bookingCollection.findOne({ _id: new ObjectId(bookingId) });

        if (!booking) {
            await client.close();
            return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
        }

  
        const session = await stripe.checkout.sessions.create({
            customer_email: user.email,
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: booking.ticketTitle || 'Ticket',
                        },
                        unit_amount: Math.round((booking.totalPrice / booking.bookingQuantity) * 100),
                    },
                    quantity: booking.bookingQuantity,
                },
            ],
            mode: 'payment',
            success_url: `${origin}/dashboard/user/bookingTickets/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/dashboard/user/bookingTickets`,
            metadata: {
                bookingId: bookingId,
            },
        });

        await client.close();
        return NextResponse.redirect(session.url, 303);
    } catch (err) {
        console.error('Stripe session error:', err);
        return NextResponse.json(
            { error: err.message || 'Something went wrong' },
            { status: 500 }
        );
    }
}