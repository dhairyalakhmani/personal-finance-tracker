import { useState } from 'react';
import { useTransactions } from '../hooks/useTransactions';
import { isSameMonth } from 'date-fns';
import { FiEdit3, FiSave, FiAlertCircle } from 'react-icons/fi';

export default function Budget() {
    const { transactions, budget, updateBudget } = useTransactions();
    const [isEditing, setIsEditing] = useState(false);
    const [newBudgetAmount, setNewBudgetAmount] = useState(budget.monthlyBudget);

    const sameMonthExpenses = transactions.filter(tx =>
        tx.type.toLowerCase() === 'expense' && isSameMonth(new Date(tx.date), new Date())
    );
    const totalSpent = sameMonthExpenses.reduce((a, b) => a + b.amount, 0);
    const remainingBudget = budget.monthlyBudget - totalSpent;
    const percentageUsed = budget.monthlyBudget > 0 ? ((totalSpent / budget.monthlyBudget) * 100) : 0;

    const handleToggleEdit = () => {
        if (isEditing) {
            updateBudget(Number(newBudgetAmount));
        }
        setIsEditing(!isEditing);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">Budget Tracking</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-2">Monitor your monthly spending against your goals.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                <div className="bg-white dark:bg-navy-surface border border-gray-200 dark:border-navy-border rounded-xl shadow-sm p-6 transition-colors duration-300">
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Monthly Budget</h3>
                        <button onClick={handleToggleEdit} className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                            {isEditing ? <FiSave className="w-5 h-5" /> : <FiEdit3 className="w-5 h-5" />}
                        </button>
                    </div>

                    {isEditing ? (
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">₹</span>
                            <input
                                value={newBudgetAmount}
                                onChange={(e) => setNewBudgetAmount(e.target.value)}
                                type="number"
                                className="w-full text-2xl font-bold bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-navy-border rounded-lg px-3 py-1 outline-none text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500/50"
                            />
                        </div>
                    ) : (
                        <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                            ₹{budget.monthlyBudget.toLocaleString()}
                        </p>
                    )}
                </div>

                <div className="bg-white dark:bg-navy-surface border border-gray-200 dark:border-navy-border rounded-xl shadow-sm p-6 transition-colors duration-300">
                    <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">Total Spent (This Month)</h3>
                    <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                        ₹{totalSpent.toLocaleString()}
                    </p>
                </div>

                <div className="bg-white dark:bg-navy-surface border border-gray-200 dark:border-navy-border rounded-xl shadow-sm p-6 transition-colors duration-300">
                    <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">Remaining</h3>
                    <p className={`text-3xl font-bold ${remainingBudget < 0 ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                        ₹{remainingBudget.toLocaleString()}
                    </p>
                </div>

            </div>

            <div className="bg-white dark:bg-navy-surface border border-gray-200 dark:border-navy-border rounded-xl shadow-sm p-6 md:p-8 transition-colors duration-300">
                <div className="flex justify-between items-end mb-4">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Budget Usage</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            You have used {Math.min(percentageUsed, 100).toFixed(1)}% of your budget.
                        </p>
                    </div>
                    {percentageUsed >= 100 && (
                        <div className="flex items-center gap-1.5 text-red-600 dark:text-red-400 text-sm font-medium animate-pulse">
                            <FiAlertCircle className="w-4 h-4" />
                            <span>Budget Exceeded</span>
                        </div>
                    )}
                </div>

                <div className="w-full h-4 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                        className={`h-full rounded-full transition-all duration-1000 ease-out ${percentageUsed < 75 ? 'bg-emerald-500' :
                            percentageUsed < 100 ? 'bg-amber-500' : 'bg-red-500'
                            }`}
                        style={{ width: `${Math.min(percentageUsed, 100)}%` }}
                    ></div>
                </div>
            </div>

        </div>
    );
}