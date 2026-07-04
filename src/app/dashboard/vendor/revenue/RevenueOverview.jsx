'use client';

import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, Cell
} from 'recharts';
import { FaChartLine, FaTicketAlt, FaPlusCircle } from 'react-icons/fa';

const RevenueOverview = ({ stats }) => {
    const { totalRevenue, totalSold, totalAdded, monthlyData } = stats;

    // চার্টের ডেটা ফরম্যাট
    const chartData = monthlyData.length > 0 ? monthlyData : [{ month: 'No data', revenue: 0 }];

    // সংখ্যা ফরম্যাট
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'BDT',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div className="space-y-8">
            {/* স্ট্যাট কার্ড */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 flex items-center gap-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                        <FaChartLine className="text-blue-600 text-2xl" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Total Revenue</p>
                        <p className="text-2xl font-bold text-gray-800">{formatCurrency(totalRevenue)}</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 flex items-center gap-4">
                    <div className="bg-green-100 p-3 rounded-full">
                        <FaTicketAlt className="text-green-600 text-2xl" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Tickets Sold</p>
                        <p className="text-2xl font-bold text-gray-800">{totalSold}</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 flex items-center gap-4">
                    <div className="bg-purple-100 p-3 rounded-full">
                        <FaPlusCircle className="text-purple-600 text-2xl" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Tickets Added</p>
                        <p className="text-2xl font-bold text-gray-800">{totalAdded}</p>
                    </div>
                </div>
            </div>

            {/* চার্ট */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Revenue (Last 6 Months)</h3>
                <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis tickFormatter={(value) => `৳${value}`} />
                            <Tooltip formatter={(value) => `৳${value}`} />
                            <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]}>
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.revenue > 0 ? '#3b82f6' : '#d1d5db'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                {chartData.length === 1 && chartData[0].month === 'No data' && (
                    <p className="text-center text-gray-400 mt-2">No revenue data available yet.</p>
                )}
            </div>
        </div>
    );
};

export default RevenueOverview;