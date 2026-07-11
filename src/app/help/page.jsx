import Link from 'next/link';
import { FaEnvelope, FaPhone, FaMessage, FaFacebook } from 'react-icons/fa6';

export default function HelpPage() {
    const faqs = [
        {
            q: 'How do I book a ticket?',
            a: 'Search for your route, select a ticket, click "Book Now", choose quantity, and confirm. Your booking will be saved in your dashboard.',
        },
        {
            q: 'Can I cancel my booking?',
            a: 'Yes, you can cancel your booking before the vendor accepts it. Go to "My Booked Tickets" and click "Cancel" if available.',
        },
        {
            q: 'How do I pay for a ticket?',
            a: 'After the vendor accepts your booking, a "Pay Now" button will appear. Click it to complete payment via Stripe.',
        },
        {
            q: 'What if my departure time has passed?',
            a: 'You cannot book or pay for a ticket if the departure time has already passed.',
        },
        {
            q: 'How do I contact a vendor?',
            a: 'Vendor contact details are shown on the ticket details page. You can also contact support for assistance.',
        },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            {/* Breadcrumb */}
            <div className="text-sm text-gray-500 mb-6">
                <Link href="/" className="hover:text-blue-600">Home</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-700">Help & Support</span>
            </div>

            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Help & Support</h1>
                <p className="text-gray-500 text-lg">Find answers to your questions or get in touch with us.</p>
            </div>

            {/* FAQ Section */}
            <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <div key={idx} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                            <h3 className="font-semibold text-gray-800">{faq.q}</h3>
                            <p className="text-gray-600 text-sm mt-1">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Contact Section */}
            <div className="mt-16 bg-gray-50 rounded-3xl p-8 md:p-12">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">Still Need Help?</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <FaEnvelope className="text-blue-600 text-xl" />
                        </div>
                        <h3 className="font-semibold text-gray-800">Email</h3>
                        <p className="text-sm text-gray-500">support@ticketbari.com</p>
                        <p className="text-xs text-gray-400 mt-1">Response within 24 hours</p>
                    </div>
                    <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <FaPhone className="text-green-600 text-xl" />
                        </div>
                        <h3 className="font-semibold text-gray-800">Phone</h3>
                        <p className="text-sm text-gray-500">+880 800 90 90</p>
                        <p className="text-xs text-gray-400 mt-1">9 AM – 9 PM (Everyday)</p>
                    </div>
                    <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
                        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <FaFacebook className="text-amber-600 text-xl" />
                        </div>
                        <h3 className="font-semibold text-gray-800">Facebook</h3>
                        <p className="text-sm text-gray-500">/TicketBari</p>
                        <p className="text-xs text-gray-400 mt-1">DM us for quick replies</p>
                    </div>
                </div>
            </div>
        </div>
    );
}