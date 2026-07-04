'use client';

import { useSession } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { FaEnvelope, FaUserTag, FaUsers, FaTicketAlt, FaBuilding } from "react-icons/fa";

const AdminProfilePage = () => {
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

    const getInitial = (name) => name?.charAt(0).toUpperCase() || 'A';

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* প্রোফাইল কার্ড */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                {/* কভার ইমেজ / হেডার */}
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
                                <div className="w-full h-full rounded-full bg-purple-100 flex items-center justify-center text-4xl font-bold text-purple-600">
                                    {getInitial(user.name)}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* প্রোফাইল ইনফো */}
                <div className="pt-16 pb-8 px-6 md:px-10">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                                {user.name || 'Admin'}
                            </h2>
                            <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                                <FaEnvelope className="text-gray-400" size={14} />
                                {user.email || 'No email'}
                            </p>
                            <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                                <FaUserTag className="text-gray-400" size={14} />
                                <span className="capitalize font-semibold text-purple-600">{user.role || 'admin'}</span>
                            </p>
                        </div>
                    </div>

                    {/* স্ট্যাটস (ডামি ডেটা – পরে API যোগ করবে) */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-200">
                        <div className="bg-gray-50 rounded-xl p-4 text-center">
                            <p className="text-2xl font-bold text-purple-600">0</p>
                            <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
                                <FaUsers size={14} /> Total Users
                            </p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4 text-center">
                            <p className="text-2xl font-bold text-purple-600">0</p>
                            <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
                                <FaTicketAlt size={14} /> Total Tickets
                            </p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4 text-center">
                            <p className="text-2xl font-bold text-purple-600">0</p>
                            <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
                                <FaBuilding size={14} /> Total Vendors
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* কুইক অ্যাকশন */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                <Link href="/dashboard/admin/manage-tickets">
                    <div className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-md transition cursor-pointer hover:border-purple-400">
                        <div className="text-3xl mb-2">🎫</div>
                        <h3 className="font-semibold text-gray-800">Manage Tickets</h3>
                        <p className="text-sm text-gray-500">Approve or reject tickets</p>
                    </div>
                </Link>
                <Link href="/dashboard/admin/manage-users">
                    <div className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-md transition cursor-pointer hover:border-purple-400">
                        <div className="text-3xl mb-2">👥</div>
                        <h3 className="font-semibold text-gray-800">Manage Users</h3>
                        <p className="text-sm text-gray-500">Manage all users</p>
                    </div>
                </Link>
                <Link href="/dashboard/admin/advertise">
                    <div className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-md transition cursor-pointer hover:border-purple-400">
                        <div className="text-3xl mb-2">📢</div>
                        <h3 className="font-semibold text-gray-800">Advertise Tickets</h3>
                        <p className="text-sm text-gray-500">Advertise up to 6 tickets</p>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default AdminProfilePage;