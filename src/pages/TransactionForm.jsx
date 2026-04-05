/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useTransactions } from '../hooks/useTransactions';
import { toast } from 'react-toastify';
import { FiArrowLeft } from 'react-icons/fi';

export default function TransactionForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);
  const { transactions, addTransaction, updateTransaction } = useTransactions();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      type: 'expense',
      date: new Date().toISOString().split('T')[0]
    }
  });

  useEffect(() => {
    if (!isEditing) return;

    if (transactions.length === 0) return;

    const tx = transactions.find(t => String(t.id) === String(id));

    if (tx) {
      const formattedDate = new Date(tx.date).toISOString().split('T')[0];
      reset({
        title: tx.title,
        amount: tx.amount,
        date: formattedDate,
        type: tx.type,
        category: tx.category,
        notes: tx.notes || '',
        recurring: tx.recurring || false
      });
    } else {
      toast.error('Transaction not found!');
      navigate('/transactions');
    }
  }, [id, isEditing, transactions, reset, navigate]);

  const onSubmit = (data) => {
    const payload = {
      ...data,
      amount: Number(data.amount),
    };

    if (isEditing) {
      updateTransaction(id, payload);
      toast.success('Transaction updated successfully!');
    } else {
      addTransaction(payload);
      toast.success('Transaction added successfully!');
    }
    
    navigate('/transactions');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8 flex items-center gap-4">
        <button 
          onClick={() => navigate('/transactions')}
          className="p-2 text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 bg-white dark:bg-navy-surface border border-gray-200 dark:border-navy-border rounded-lg transition-colors"
        >
          <FiArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            {isEditing ? 'Edit Transaction' : 'Add Transaction'}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            {isEditing ? 'Update the details of your transaction below.' : 'Record a new income or expense to track your finances.'}
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-navy-surface border border-gray-200 dark:border-navy-border rounded-xl shadow-sm p-6 md:p-8 transition-colors duration-300">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Transaction Title</label>
              <input
                type="text"
                {...register('title', {
                  required: 'Title is required',
                  minLength: { value: 3, message: 'Title must be at least 3 characters' }
                })}
                placeholder="e.g., Monthly Salary, Grocery Run"
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-navy-border rounded-lg text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all"
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Amount (₹)</label>
              <input
                type="number"
                step="0.01"
                {...register('amount', {
                  required: 'Amount is required',
                  min: { value: 0.01, message: 'Amount must be greater than zero' }
                })}
                placeholder="0.00"
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-navy-border rounded-lg text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all"
              />
              {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Date</label>
              <input
                type="date"
                {...register('date', {
                  required: 'Date is required',
                  max: { value: '2100-12-31', message: 'Year cannot exceed 2100' },
                  min: { value: '2000-01-01', message: 'Year must be 2000 or later' }
                })}
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-navy-border rounded-lg text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all [color-scheme:light] dark:[color-scheme:dark]"
              />
              {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Type</label>
              <select
                {...register('type', { required: 'Type is required' })}
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-navy-border rounded-lg text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all appearance-none"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
              {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Category</label>
              <select
                {...register('category', { required: 'Category is required' })}
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-navy-border rounded-lg text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all appearance-none"
              >
                <option value="">Select a category...</option>
                <option value="Food">Food</option>
                <option value="Travel">Travel</option>
                <option value="Rent">Rent</option>
                <option value="Shopping">Shopping</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Health">Health</option>
                <option value="Utilities">Utilities</option>
                <option value="Subscriptions">Subscriptions</option>
                <option value="Income">Income</option>
              </select>
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Notes (Optional)</label>
            <textarea
              {...register('notes', {
                maxLength: { value: 200, message: 'Notes cannot exceed 200 characters' }
              })}
              rows="3"
              placeholder="Add any extra details here..."
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-navy-border rounded-lg text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all resize-none"
            ></textarea>
            {errors.notes && <p className="text-red-500 text-sm mt-1">{errors.notes.message}</p>}
          </div>

          <div className="flex items-center gap-3 p-4 bg-indigo-50/50 dark:bg-indigo-500/5 rounded-lg border border-indigo-100 dark:border-indigo-500/20">
            <input
              type="checkbox"
              id="recurring"
              {...register('recurring')}
              className="w-5 h-5 text-indigo-600 bg-white border-gray-300 rounded focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-navy-surface focus:ring-2 dark:bg-slate-800 dark:border-slate-600 cursor-pointer"
            />
            <label htmlFor="recurring" className="text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer select-none">
              Mark as a recurring transaction (e.g., Subscriptions, Rent)
            </label>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-navy-border">
            <button
              type="submit"
              className="w-full md:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition-colors duration-200 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-navy-surface"
            >
              {isEditing ? 'Save Changes' : 'Save Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}