'use client';

import { useSession } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { FaUserEdit, FaEnvelope, FaUserTag, FaUserCircle } from "react-icons/fa";

const VendorDashboardHomePage = () => {
    const { data: session, isPending } = useSession();

    if (isPending) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    const user = session?.user;

    if (!user) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">No user data found. Please login again.</p>
            </div>
        );
    }

    // Get initial for avatar
    const getInitial = (name) => {
        if (!name) return 'U';
        return name.charAt(0).toUpperCase();
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                {/* Cover Image / Header */}
                <div className="bg-amber-50 h-32 md:h-40 relative">
                    <div className="absolute -bottom-12 left-6 md:left-10">
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white p-1 shadow-lg flex items-center justify-center">

                            {user.image ? (
                                <Image
                                    src={user.image}
                                    alt={user.name}
                                    width={128}
                                    height={128}
                                    className="w-full h-full rounded-full object-cover"
                                    unoptimized
                                />
                            ) : (
                                <div className="w-full h-full rounded-full bg-blue-100 flex items-center justify-center text-4xl font-bold text-blue-600">
                                    {getInitial(user.name)}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Profile Info */}
                <div className="pt-16 pb-8 px-6 md:px-10">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                                {user.name || 'Vendor'}
                            </h2>
                            <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                                <FaEnvelope className="text-gray-400" size={14} />
                                {user.email || 'No email'}
                            </p>
                            <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                                <FaUserTag className="text-gray-400" size={14} />
                                <span className="capitalize">{user.role || 'vendor'}</span>
                            </p>
                        </div>

                        {/* Edit Profile Button */}
                        <Link href={``}>
                            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-lg transition shadow-sm hover:shadow">
                                <FaUserEdit size={16} />
                                Edit Profile
                            </button>
                        </Link>
                    </div>

                    {/* Additional Stats / Info (optional) */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-200">
                        <div className="bg-gray-50 rounded-xl p-4 text-center">
                            <p className="text-2xl font-bold text-blue-600">0</p>
                            <p className="text-sm text-gray-500">Total Tickets</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4 text-center">
                            <p className="text-2xl font-bold text-blue-600">0</p>
                            <p className="text-sm text-gray-500">Bookings Received</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4 text-center">
                            <p className="text-2xl font-bold text-blue-600">$0</p>
                            <p className="text-sm text-gray-500">Revenue</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                <Link href="/dashboard/vendor/add-ticket">
                    <div className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-md transition cursor-pointer hover:border-blue-400">

                        <h3 className="font-semibold text-gray-800">Add New Ticket</h3>
                        <p className="text-sm text-gray-500">Post a new ticket</p>
                    </div>
                </Link>
                <Link href="/dashboard/vendor/my-tickets">
                    <div className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-md transition cursor-pointer hover:border-blue-400">
                        <div className="text-3xl mb-2">🎫</div>
                        <h3 className="font-semibold text-gray-800">My Tickets</h3>
                        <p className="text-sm text-gray-500">Manage your tickets</p>
                    </div>
                </Link>
                <Link href="/dashboard/vendor/requests">
                    <div className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-md transition cursor-pointer hover:border-blue-400">
                        <div className="text-3xl mb-2">📋</div>
                        <h3 className="font-semibold text-gray-800">Booking Requests</h3>
                        <p className="text-sm text-gray-500">View & respond</p>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default VendorDashboardHomePage;