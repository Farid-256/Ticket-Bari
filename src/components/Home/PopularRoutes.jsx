import Image from 'next/image';
import Link from 'next/link';
import { FaBus, FaTrain, FaPlane } from 'react-icons/fa';

const routes = [
    { id: 1, from: 'Dhaka', to: 'Chittagong', transport: 'Bus', image: '/assets/dhaka-chittagong.jpg' },
    { id: 2, from: 'Dhaka', to: 'Khulna', transport: 'Train', image: '/assets/dhaka-khulna.jpg' },
    { id: 3, from: 'Dhaka', to: 'Sylhet', transport: 'Bus', image: '/assets/dhaka-sylhet.jpg' },
    { id: 4, from: 'Dhaka', to: 'Rajshahi', transport: 'Airplane', image: '/assets/dhaka-rajshahi.jpg' },
];

const PopularRoutes = () => {
    return (
        <section className="max-w-7xl mx-auto px-4 py-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Popular Routes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {routes.map((route) => (
                    <div key={route.id} className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition group">
                        <div className="relative w-full h-40 bg-gray-200">
                            {route.image ? (
                                <Image
                                    src={route.image}
                                    alt={`${route.from} to ${route.to}`}
                                    fill
                                    className="object-cover group-hover:scale-105 transition duration-300"
                                    unoptimized
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-400">
                                    No Image
                                </div>
                            )}
                        </div>
                        <div className="p-4 text-center">
                            <h3 className="font-semibold text-gray-800">
                                {route.from} → {route.to}
                            </h3>
                            <p className="text-sm text-gray-500 flex items-center justify-center gap-1 mt-1">
                                {route.transport === 'Bus' && <FaBus className="text-blue-600" />}
                                {route.transport === 'Train' && <FaTrain className="text-green-600" />}
                                {route.transport === 'Airplane' && <FaPlane className="text-purple-600" />}
                                {route.transport}
                            </p>
                            <Link href={`/allTickets?from=${route.from}&to=${route.to}`} className="mt-3 inline-block text-sm text-blue-600 hover:underline font-medium">
                                Find Tickets →
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PopularRoutes;