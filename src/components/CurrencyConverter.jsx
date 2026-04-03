import { useState, useEffect } from 'react';
import { FiRefreshCw, FiDollarSign } from 'react-icons/fi';
import axios from 'axios';

export default function CurrencyConverter() {
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState('INR');
    const [toCurrency, setToCurrency] = useState('USD');
    const [convertedAmount, setConvertedAmount] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const currencies = ['USD', 'INR', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'];

    useEffect(() => {
        const fetchConversion = async () => {
            if (fromCurrency === toCurrency) {
                setConvertedAmount(amount);
                return;
            }
            setIsLoading(true);
            try {
                const baseURL = import.meta.env.MODE === 'development'
                    ? '/api/frankfurter'
                    : 'https://api.frankfurter.app';

                const response = await axios(`${baseURL}/latest`, {
                    params: {
                        amount: amount,
                        from: fromCurrency,
                        to: toCurrency,
                    }
                });

                setConvertedAmount(response.data.rates[toCurrency])
            } catch (error) {
                console.error("Failed to fetch currency: ", error);
                setConvertedAmount("Error");
            } finally {
                setIsLoading(false);
            }
        };
        const delayDebounceFunction = setTimeout(() => {
            if (amount > 0) fetchConversion();
        }, 500)

        return () => clearTimeout(delayDebounceFunction);
    }, [amount, fromCurrency, toCurrency]);

    return (
        <div className="bg-white dark:bg-navy-surface border border-gray-200 dark:border-navy-border rounded-xl shadow-sm p-6 transition-colors duration-300">
            <div className="flex items-center gap-2 mb-6">
                <FiDollarSign className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Live Exchange Rates</h2>
            </div>

            <div className="space-y-4">
                {/* Amount Input */}
                <div>
                    <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">Amount</label>
                    <input
                        type="number"
                        min="0"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-navy-border rounded-lg text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                    />
                </div>

                {/* Currency Dropdowns */}
                <div className="flex items-center gap-3">
                    <div className="flex-1">
                        <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">From</label>
                        <select
                            value={fromCurrency}
                            onChange={(e) => setFromCurrency(e.target.value)}
                            className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-navy-border rounded-lg text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all appearance-none cursor-pointer"
                        >
                            {currencies.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>

                    <div className="pt-5 text-slate-400">
                        <FiRefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-indigo-500' : ''}`} />
                    </div>

                    <div className="flex-1">
                        <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">To</label>
                        <select
                            value={toCurrency}
                            onChange={(e) => setToCurrency(e.target.value)}
                            className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-navy-border rounded-lg text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all appearance-none cursor-pointer"
                        >
                            {currencies.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                </div>

                {/* Result Area */}
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-slate-800 flex justify-between items-end">
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Converted Amount:</span>
                    <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                        {convertedAmount !== null ? convertedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '...'}
                    </span>
                </div>
            </div>
        </div>
    );
}
