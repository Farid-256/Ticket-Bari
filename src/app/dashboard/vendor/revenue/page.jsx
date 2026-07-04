import { requireRole } from '@/lib/core/sesson';
import { getVendorStats } from '@/lib/actions/vendor';
import RevenueOverview from './RevenueOverview';

export default async function RevenuePage() {
    const user = await requireRole('vendor');
    let stats = { totalRevenue: 0, totalSold: 0, totalAdded: 0, monthlyData: [] };
    try {
        stats = await getVendorStats(user.id);
    } catch (error) {
        console.error('Error fetching vendor stats:', error);
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Revenue Overview</h1>
            <p className="text-gray-500 mb-6">View your earnings and ticket performance.</p>
            <RevenueOverview stats={stats} />
        </div>
    );
}