import { FiTrendingUp, FiTrendingDown, FiDollarSign } from 'react-icons/fi';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useTransactions } from '../hooks/useTransactions';

export default function Dashboard() {
    const { transactions } = useTransactions();

    const incomes = transactions.filter(tx => tx.type === 'income');
    const expenses = transactions.filter(tx => tx.type === 'expense');

    const totalIncome = incomes.reduce((sum, tx) => sum + tx.amount, 0);
    const totalExpense = expenses.reduce((sum, tx) => sum + tx.amount, 0);

    const netBalance = totalIncome - totalExpense;

    const groupedExpenses = expenses.reduce((accumulator, tx) => {
        if (!accumulator[tx.category]) {
            accumulator[tx.category] = 0;
        }
        accumulator[tx.category] += tx.amount;
        return accumulator;
    }, {});

    const expenseChartData = Object.keys(groupedExpenses).map(categoryName => ({
        name: categoryName,
        value: groupedExpenses[categoryName]
    }));

    const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#f97316'];

    return (
        <div className="max-w-6xl mx-auto animate-fade-in">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">Financial Overview</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-2">Welcome back! Here is a summary of your current finances.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                <div className="bg-white dark:bg-navy-surface border border-gray-200 dark:border-navy-border rounded-xl shadow-sm p-6 transition-colors duration-300 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                        <FiDollarSign className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Net Balance</h3>
                        <p className={`text-2xl font-bold ${netBalance < 0 ? 'text-red-600 dark:text-red-400' : 'text-slate-900 dark:text-slate-100'}`}>
                            ₹{netBalance.toLocaleString()}
                        </p>
                    </div>
                </div>

                <div className="bg-white dark:bg-navy-surface border border-gray-200 dark:border-navy-border rounded-xl shadow-sm p-6 transition-colors duration-300 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                        <FiTrendingUp className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Total Income</h3>
                        <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                            ₹{totalIncome.toLocaleString()}
                        </p>
                    </div>
                </div>

                <div className="bg-white dark:bg-navy-surface border border-gray-200 dark:border-navy-border rounded-xl shadow-sm p-6 transition-colors duration-300 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center text-red-600 dark:text-red-400">
                        <FiTrendingDown className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Total Expenses</h3>
                        <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                            ₹{totalExpense.toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                <div className="bg-white dark:bg-navy-surface border border-gray-200 dark:border-navy-border rounded-xl shadow-sm p-6 transition-colors duration-300">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-6">Expense Breakdown</h2>

                    {expenseChartData.length > 0 ? (
                        <div className="h-72 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={expenseChartData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={90}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {expenseChartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} className="stroke-white dark:stroke-navy-surface stroke-2 transition-colors duration-300" />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        formatter={(value) => `₹${value.toLocaleString()}`}
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        <div className="h-72 flex items-center justify-center">
                            <p className="text-slate-500 dark:text-slate-400">No expense data available.</p>
                        </div>
                    )}
                </div>

                <div className="bg-white dark:bg-navy-surface border border-gray-200 dark:border-navy-border rounded-xl shadow-sm p-6 transition-colors duration-300 flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Recent Activity</h2>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                        {transactions.slice(0, 4).map((tx) => (
                            <div key={tx.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800/30 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-navy-border">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${tx.type === 'income'
                                        ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400'
                                        : 'bg-indigo-100 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400'
                                        }`}>
                                        {tx.category.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-900 dark:text-slate-100 line-clamp-1">{tx.title}</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">{new Date(tx.date).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className={`text-sm font-semibold whitespace-nowrap ${tx.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300'
                                    }`}>
                                    {tx.type === 'income' ? '+' : '-'}₹{tx.amount.toLocaleString()}
                                </div>
                            </div>
                        ))}

                        {transactions.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-10 px-4 text-center animate-fade-in h-full">

                                <svg
                                    viewBox="0 0 64 64"
                                    className="w-16 h-16 mb-4"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M14 38L20 50H44L50 38"
                                        className="fill-slate-50 dark:fill-slate-800/30 stroke-slate-200 dark:stroke-slate-700 transition-colors duration-300"
                                        strokeWidth="2"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M14 38H50"
                                        className="stroke-slate-200 dark:stroke-slate-700 transition-colors duration-300"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                    <circle
                                        cx="32" cy="22" r="12"
                                        className="fill-white dark:fill-navy-surface stroke-slate-300 dark:stroke-slate-500 transition-colors duration-300"
                                        strokeWidth="2"
                                    />
                                    <path
                                        d="M24 30L40 14"
                                        className="stroke-slate-300 dark:stroke-slate-500 transition-colors duration-300"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                </svg>

                                <p className="text-slate-700 dark:text-slate-300 font-medium text-sm mb-1">
                                    No recent activity
                                </p>
                                <p className="text-slate-500 dark:text-slate-400 text-xs max-w-[200px]">
                                    Your latest transactions will automatically appear here.
                                </p>

                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}