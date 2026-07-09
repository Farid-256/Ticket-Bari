import { NextResponse } from 'next/server';
import { getUserSession } from '@/lib/core/sesson';

export async function GET(req) {
    try {
        const user = await getUserSession();
        if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId') || user.id;

        const bookings = await bookingCollection.find({ userId, status: 'paid' })
            .sort({ paidAt: -1 })
            .toArray();

        const transactions = bookings.map(booking => ({
            transactionId: booking.paymentIntentId || booking._id,
            amount: booking.totalPrice,
            ticketTitle: booking.ticketTitle,
            paymentDate: booking.paidAt || booking.createdAt,
        }));

        return NextResponse.json(transactions);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}