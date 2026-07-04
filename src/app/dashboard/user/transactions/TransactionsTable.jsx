'use client';

const TransactionsTable = ({ transactions }) => {
    if (transactions.length === 0) {
        return (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                <p className="text-gray-500 text-lg">No transactions yet.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Transaction ID</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Ticket Title</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Amount</th>
                            <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Payment Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {transactions.map((tx, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 font-mono text-xs text-gray-600">
                                    {tx.transactionId}
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900">
                                    {tx.ticketTitle}
                                </td>
                                <td className="px-6 py-4 font-medium text-blue-600">
                                    ৳{tx.amount}
                                </td>
                                <td className="px-6 py-4 text-gray-600">
                                    {new Date(tx.paymentDate).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 text-sm text-gray-500">
                Total: {transactions.length} transactions
            </div>
        </div>
    );
};

export default TransactionsTable;