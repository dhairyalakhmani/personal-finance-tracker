import { useState } from 'react';
import { useTransactions } from '../hooks/useTransactions';
import { formatDate } from 'date-fns';
import { FiSearch, FiTrash2, FiEdit2 } from 'react-icons/fi';
import { useDebounce } from '../hooks/useDebounce';
import { useNavigate } from 'react-router-dom';

export default function Transactions() {

    const navigate = useNavigate();

    const { transactions, deleteTransaction } = useTransactions();

    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [sortBy, setSortBy] = useState('date-desc');

    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    const filteredTransactions = transactions.filter((tx) => {
        const matchesSearch =
            tx.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
            (tx.notes && tx.notes.toLowerCase().includes(debouncedSearchTerm.toLowerCase()));
        const matchesFilter = filterType === 'all' || tx.type === filterType;
        return matchesSearch && matchesFilter;
    });

    const sortedTransactions = [...filteredTransactions].sort((a, b) => {
        if (sortBy === 'date-desc') {
            return new Date(b.date) - new Date(a.date);
        }
        if (sortBy === 'date-asc') {
            return new Date(a.date) - new Date(b.date);
        }
        if (sortBy === 'amount-desc') {
            return b.amount - a.amount;
        }
        if (sortBy === 'amount-asc') {
            return a.amount - b.amount;
        }
        return 0;
    });

    return (
        <div className="max-w-6xl mx-auto">

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">Transactions</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2">View, search, and manage your financial history.</p>
                </div>
            </div>

            <div className="bg-white dark:bg-navy-surface border border-gray-200 dark:border-navy-border rounded-xl shadow-sm p-4 mb-6 flex flex-col md:flex-row gap-4 transition-colors duration-300">
                <div className="relative flex-1">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                        type="text"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search transactions..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-navy-border rounded-lg text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all"
                    />
                </div>
                <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="px-4 py-2 bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-navy-border rounded-lg text-slate-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors outline-none cursor-pointer appearance-none"
                >
                    <option value="all">All Types</option>
                    <option value="income">Income Only</option>
                    <option value="expense">Expenses Only</option>
                </select>

                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-navy-border rounded-lg text-slate-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors outline-none cursor-pointer appearance-none"
                >
                    <option value="date-desc">Newest First</option>
                    <option value="date-asc">Oldest First</option>
                    <option value="amount-desc">Highest Amount</option>
                    <option value="amount-asc">Lowest Amount</option>
                </select>
            </div>

            <div className="bg-white dark:bg-navy-surface border border-gray-200 dark:border-navy-border rounded-xl shadow-sm overflow-hidden transition-colors duration-300">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-slate-800/50 border-b border-gray-200 dark:border-navy-border">
                                <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Date</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Title</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Category</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Amount</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-600 dark:text-slate-300 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-navy-border">

                            {sortedTransactions.map((tx) => (
                                <tr key={tx.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/20 transition-colors group">
                                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 whitespace-nowrap">
                                        {formatDate(new Date(tx.date), 'dd MMM yyyy')}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                                                {tx.title}
                                            </p>
                                            {tx.recurring && (
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30">
                                                    Recurring
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                            {tx.notes}
                                        </p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                                            {tx.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`text-sm font-semibold ${tx.type === 'income'
                                            ? 'text-emerald-600 dark:text-emerald-400'
                                            : 'text-slate-700 dark:text-slate-300'
                                            }`}>
                                            {tx.type === 'income' ? '+ ' : '- '}{tx.amount.toFixed(2)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => navigate(`/transactions/edit/${tx.id}`)}
                                                className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-500/10"
                                                title="Edit"
                                            >
                                                <FiEdit2 className="w-4 h-4" />
                                            </button>

                                            <button
                                                className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10"
                                                title="Delete"
                                                onClick={() => deleteTransaction(tx.id)}
                                            >
                                                <FiTrash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {filteredTransactions.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-16 text-center">
                                        <div className="flex flex-col items-center justify-center animate-fade-in">

                                            <svg
                                                viewBox="0 0 64 64"
                                                className="w-24 h-24 mb-5"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <rect
                                                    x="14" y="8" width="36" height="48" rx="4"
                                                    className="fill-slate-50 dark:fill-slate-800/30 stroke-slate-200 dark:stroke-slate-700 transition-colors duration-300"
                                                    strokeWidth="2"
                                                />

                                                <line x1="22" y1="20" x2="42" y2="20" className="stroke-slate-200 dark:stroke-slate-700 transition-colors duration-300" strokeWidth="2" strokeLinecap="round" />
                                                <line x1="22" y1="28" x2="36" y2="28" className="stroke-slate-200 dark:stroke-slate-700 transition-colors duration-300" strokeWidth="2" strokeLinecap="round" />
                                                <line x1="22" y1="36" x2="28" y2="36" className="stroke-slate-200 dark:stroke-slate-700 transition-colors duration-300" strokeWidth="2" strokeLinecap="round" />

                                                <circle
                                                    cx="40" cy="42" r="11"
                                                    className="fill-white dark:fill-navy-surface stroke-slate-300 dark:stroke-slate-500 transition-colors duration-300"
                                                    strokeWidth="2"
                                                />

                                                <line x1="48" y1="50" x2="56" y2="58" className="stroke-slate-300 dark:stroke-slate-500 transition-colors duration-300" strokeWidth="3" strokeLinecap="round" />

                                                <path d="M36 38L44 46M44 38L36 46" className="stroke-slate-300 dark:stroke-slate-500 transition-colors duration-300" strokeWidth="2" strokeLinecap="round" />
                                            </svg>

                                            <h3 className="text-slate-700 dark:text-slate-300 font-semibold text-lg mb-1">
                                                No transactions found
                                            </h3>
                                            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm">
                                                Try adjusting your search filters or record a new income or expense to get started.
                                            </p>

                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}