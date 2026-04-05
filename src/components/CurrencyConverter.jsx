import { useState, useEffect } from 'react';
import { FiRefreshCw, FiDollarSign } from 'react-icons/fi';
import CurrencyDropdown, { getFlagEmoji } from './CurrencyDropdown';
import axios from 'axios';

export default function CurrencyConverter() {
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState('INR');
    const [toCurrency, setToCurrency] = useState('USD');
    const [convertedAmount, setConvertedAmount] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [currencies, setCurrencies] = useState([]);

    useEffect(() => {
        const fetchCurrencies = async () => {
            try {
                const apiKey = import.meta.env.VITE_EXCHANGE_RATE_API_KEY;
                const response = await axios.get(`https://v6.exchangerate-api.com/v6/${apiKey}/codes`);

                if (response.data.result === 'success') {
                    setCurrencies(response.data.supported_codes);
                }
                // eslint-disable-next-line no-unused-vars
            } catch (error) {
                setCurrencies([['USD', 'United States Dollar'], ['INR', 'Indian Rupee'], ['EUR', 'Euro']]);
            }
        };

        fetchCurrencies();
    }, []);

    const handleConvert = async () => {
        if (fromCurrency === toCurrency) {
            setConvertedAmount(amount);
            return;
        }

        setIsLoading(true);
        try {
            const apiKey = import.meta.env.VITE_EXCHANGE_RATE_API_KEY;
            const response = await axios.get(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}/${amount}`);

            if (response.data.result === 'success') {
                setConvertedAmount(response.data.conversion_result);
            } else {
                throw new Error("API returned an error state");
            }

        } catch (error) {
            console.error("Failed to fetch currency: ", error);
            setConvertedAmount("Error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-navy-surface border border-gray-200 dark:border-navy-border rounded-xl shadow-sm p-6 transition-colors duration-300 h-full flex flex-col">
            <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    <FiRefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                </div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Quick Conversion</h2>
            </div>

            <div className="space-y-5 flex-1">
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Amount</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiDollarSign className="text-slate-400 dark:text-slate-500" />
                        </div>
                        <input
                            type="number"
                            min="0"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-navy-border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    <CurrencyDropdown
                        label="From"
                        value={fromCurrency}
                        onChange={setFromCurrency}
                        options={currencies}
                    />
                    <CurrencyDropdown
                        label="To"
                        value={toCurrency}
                        onChange={setToCurrency}
                        options={currencies}
                    />
                </div>
                <button
                    onClick={handleConvert}
                    disabled={isLoading || currencies.length === 0}
                    className="w-full mt-2 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <>
                            <FiRefreshCw className="w-5 h-5 animate-spin" />
                            Converting...
                        </>
                    ) : (
                        "Convert Currency"
                    )}
                </button>
            </div>

        <div className="mt-6 pt-6 border-t border-gray-100 dark:border-navy-border/50">
            <p className="text-sm text-slate-500 dark:text-slate-400 text-center mb-1">Converted Amount</p>
            <div className="text-3xl font-bold text-center text-slate-900 dark:text-slate-100 truncate">
                {isLoading ? (
                    <span className="text-slate-300 dark:text-slate-600 animate-pulse">Calculating...</span>
                ) : convertedAmount !== null && convertedAmount !== "Error" ? (
                    `${getFlagEmoji(toCurrency)} ${convertedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${toCurrency}`
                ) : (
                    <span className="text-red-500 text-xl">API Error</span>
                )}
            </div>
        </div>
    </div >
    );
}
