'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { updateUserRole, markUserAsFraud } from '@/lib/actions/users';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const UsersTable = ({ initialUsers }) => {
    const [users, setUsers] = useState(initialUsers);
    const [loading, setLoading] = useState({});
    const router = useRouter();

    const handleRoleChange = async (userId, newRole) => {
        setLoading(prev => ({ ...prev, [userId]: true }));
        try {
            const result = await updateUserRole(userId, newRole);
            if (result.success) {
                toast.success(`User role updated to ${newRole}`);
                // ইউজার লিস্ট আপডেট করো
                setUsers(prev => prev.map(u =>
                    u._id === userId ? { ...u, role: newRole } : u
                ));
                router.refresh();
            } else {
                toast.error(result.message || 'Failed to update role');
            }
        } catch (error) {
            toast.error(error.message || 'Something went wrong');
        } finally {
            setLoading(prev => ({ ...prev, [userId]: false }));
        }
    };

    const handleMarkFraud = async (userId) => {
        if (!confirm('Are you sure you want to mark this vendor as fraud? All their tickets will be hidden.')) return;

        setLoading(prev => ({ ...prev, [userId]: true }));
        try {
            const result = await markUserAsFraud(userId);
            if (result.success) {
                toast.success('Vendor marked as fraud');
                setUsers(prev => prev.map(u =>
                    u._id === userId ? { ...u, role: 'fraud', isFraud: true } : u
                ));
                router.refresh();
            } else {
                toast.error(result.message || 'Failed to mark as fraud');
            }
        } catch (error) {
            toast.error(error.message || 'Something went wrong');
        } finally {
            setLoading(prev => ({ ...prev, [userId]: false }));
        }
    };

    if (users.length === 0) {
        return (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <p className="text-gray-500 text-lg">No users found.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">#</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Photo</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Name</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Email</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Role</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {users.map((user, index) => {
                            const isFraud = user.isFraud || user.role === 'fraud';
                            return (
                                <tr key={user._id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 text-gray-500">{index + 1}</td>
                                    <td className="px-6 py-4">
                                        {user.image ? (
                                            <div className="relative w-10 h-10 rounded-full overflow-hidden">
                                                <Image src={user.image} alt={user.name} fill className="object-cover" unoptimized />
                                            </div>
                                        ) : (
                                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-lg font-bold">
                                                {user.name?.[0]?.toUpperCase() || 'U'}
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{user.name}</td>
                                    <td className="px-6 py-4 text-gray-600">{user.email}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${isFraud ? 'bg-red-100 text-red-700' :
                                                user.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                                                    user.role === 'vendor' ? 'bg-blue-100 text-blue-700' :
                                                        'bg-gray-100 text-gray-700'
                                            }`}>
                                            {isFraud ? 'Fraud' : user.role || 'user'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-2 flex-wrap">
                                            {/* Make Admin */}
                                            {user.role !== 'admin' && !isFraud && (
                                                <button
                                                    onClick={() => handleRoleChange(user._id, 'admin')}
                                                    disabled={loading[user._id]}
                                                    className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium rounded-lg transition disabled:opacity-50"
                                                >
                                                    {loading[user._id] ? '...' : 'Make Admin'}
                                                </button>
                                            )}

                                            {/* Make Vendor */}
                                            {user.role !== 'vendor' && !isFraud && (
                                                <button
                                                    onClick={() => handleRoleChange(user._id, 'vendor')}
                                                    disabled={loading[user._id]}
                                                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition disabled:opacity-50"
                                                >
                                                    {loading[user._id] ? '...' : 'Make Vendor'}
                                                </button>
                                            )}

                                            {/* Mark as Fraud (শুধু vendor) */}
                                            {user.role === 'vendor' && !isFraud && (
                                                <button
                                                    onClick={() => handleMarkFraud(user._id)}
                                                    disabled={loading[user._id]}
                                                    className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded-lg transition disabled:opacity-50"
                                                >
                                                    {loading[user._id] ? '...' : 'Mark as Fraud'}
                                                </button>
                                            )}

                                            {isFraud && (
                                                <span className="text-xs text-red-500 font-medium">Fraud</span>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 text-sm text-gray-500">
                Total: {users.length} users
            </div>
        </div>
    );
};

export default UsersTable;