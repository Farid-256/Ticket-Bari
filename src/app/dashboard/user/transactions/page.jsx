import { getUserSession } from '@/lib/core/sesson';
import { getUserTransactions } from '@/lib/actions/transaction';
import TransactionsTable from './TransactionsTable';

export default async function TransactionHistoryPage() {
    const user = await getUserSession();
    if (!user) {
        return <div className="text-center py-10">Please login to view transactions.</div>;
    }

    let transactions = [];
    try {
        transactions = await getUserTransactions(user.id);
    } catch (error) {
        console.error('Error fetching transactions:', error);
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Transaction History</h1>
            <p className="text-gray-500 mb-6">View all your past payments.</p>
            <TransactionsTable transactions={transactions || []} />
        </div>
    );
}