import Link from 'next/link';
import { FaBus, FaTrain, FaPlane, FaShip } from 'react-icons/fa';

export default function AboutPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            {/* Breadcrumb */}
            <div className="text-sm text-gray-500 mb-6">
                <Link href="/" className="hover:text-blue-600">Home</Link>
                <span className="mx-2">/</span>
                <span className="text-gray-700">About</span>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        About <span className="text-blue-600">TicketBari</span>
                    </h1>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                        TicketBari is your trusted online ticket booking platform for
                        <span className="font-semibold text-blue-600"> Bus, Train, Launch, and Flight</span>
                        tickets across Bangladesh. We make travel planning simple, fast, and reliable.
                    </p>
                    <p className="text-gray-600 leading-relaxed mb-6">
                        Founded with a mission to revolutionize the way people book tickets,
                        we offer a seamless experience from search to payment. Whether you are
                        commuting daily or planning a getaway, TicketBari ensures you get the
                        best prices and a hassle-free journey.
                    </p>
                    <div className="flex flex-wrap gap-4 mt-6">
                        <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
                            <FaBus className="text-blue-600" />
                            <span className="text-sm font-medium">Bus</span>
                        </div>
                        <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full">
                            <FaTrain className="text-green-600" />
                            <span className="text-sm font-medium">Train</span>
                        </div>
                        <div className="flex items-center gap-2 bg-purple-50 px-4 py-2 rounded-full">
                            <FaPlane className="text-purple-600" />
                            <span className="text-sm font-medium">Flight</span>
                        </div>
                        <div className="flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-full">
                            <FaShip className="text-amber-600" />
                            <span className="text-sm font-medium">Launch</span>
                        </div>
                    </div>
                </div>

                {/* Right Content - Image/Illustration */}
                <div className="rounded-3xl p-8 text-center">
                    <div className="text-8xl mb-4">🚀</div>
                    <h3 className="text-2xl font-bold text-gray-800">Your Journey Starts Here</h3>
                    <p className="text-gray-600 mt-2">Book tickets in seconds. Travel with confidence.</p>
                    <div className="mt-6 flex justify-center gap-6">
                        <div>
                            <p className="text-3xl font-bold text-blue-600">50+</p>
                            <p className="text-sm text-gray-500">Routes</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-blue-600">10K+</p>
                            <p className="text-sm text-gray-500">Happy Travelers</p>
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-blue-600">4.8★</p>
                            <p className="text-sm text-gray-500">Rating</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Our Mission Section */}
            <div className="mt-16 bg-gray-50 rounded-3xl p-8 md:p-12">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">Our Mission</h2>
                <div className="grid sm:grid-cols-3 gap-6">
                    <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
                        <div className="text-4xl mb-3">🎯</div>
                        <h3 className="font-semibold text-gray-800">Simplify Travel</h3>
                        <p className="text-sm text-gray-500 mt-1">Make booking tickets easy for everyone.</p>
                    </div>
                    <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
                        <div className="text-4xl mb-3">💚</div>
                        <h3 className="font-semibold text-gray-800">Trust & Safety</h3>
                        <p className="text-sm text-gray-500 mt-1">Secure payments and verified vendors.</p>
                    </div>
                    <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
                        <div className="text-4xl mb-3">🌍</div>
                        <h3 className="font-semibold text-gray-800">Connect Bangladesh</h3>
                        <p className="text-sm text-gray-500 mt-1">Bringing the country closer, one ticket at a time.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}