import { FaLock, FaHeadset, FaRocket, FaRegClock } from 'react-icons/fa';

const features = [
    {
        icon: FaRocket,
        title: 'Fast Booking',
        description: 'Book your tickets in just a few clicks. No hassle, no waiting.',
        color: 'text-blue-600',
        bg: 'bg-blue-50',
    },
    {
        icon: FaLock,
        title: 'Secure Payments',
        description: 'Your payment is safe with Stripe encryption and fraud protection.',
        color: 'text-green-600',
        bg: 'bg-green-50',
    },
    {
        icon: FaHeadset,
        title: '24/7 Support',
        description: 'Our team is always here to help you with any queries.',
        color: 'text-purple-600',
        bg: 'bg-purple-50',
    },
    {
        icon: FaRegClock,
        title: 'Real-time Updates',
        description: 'Get instant confirmation and live departure status.',
        color: 'text-orange-600',
        bg: 'bg-orange-50',
    },
];

const WhyChooseUs = () => {
    return (
        <section className="max-w-7xl mx-auto px-4 py-12 bg-gray-50 rounded-3xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Why Choose TicketBari?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, idx) => (
                    <div key={idx} className="bg-white rounded-2xl shadow-md p-6 text-center border border-gray-100 hover:shadow-lg transition">
                        <div className={`w-14 h-14 rounded-full ${feature.bg} flex items-center justify-center mx-auto mb-4`}>
                            <feature.icon className={`text-3xl ${feature.color}`} />
                        </div>
                        <h3 className="font-semibold text-gray-800">{feature.title}</h3>
                        <p className="text-sm text-gray-500 mt-2">{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WhyChooseUs;