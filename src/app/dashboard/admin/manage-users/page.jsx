import { getAllUsers } from '@/lib/actions/users';
import { requireRole } from '@/lib/core/sesson';
import UsersTable from './UsersTable';

export default async function ManageUsersPage() {
    await requireRole('admin');

    let users = [];
    try {
        users = await getAllUsers();
    } catch (error) {
        console.error('Error fetching users:', error);
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Manage Users</h1>
            <p className="text-gray-500 mb-6">Manage all registered users, change roles, and mark vendors as fraud.</p>
            <UsersTable initialUsers={users || []} />
        </div>
    );
}