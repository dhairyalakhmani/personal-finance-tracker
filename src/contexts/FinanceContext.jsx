import { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

// eslint-disable-next-line react-refresh/only-export-components
export const FinanceContext = createContext();

export function FinanceProvider({ children }) { 
    const [transactions, setTransactions] = useState(() => {
        const savedTransactions = localStorage.getItem('finance_transactions');
        return savedTransactions ? JSON.parse(savedTransactions) : [];
    });

    const [budget, setBudget] = useState(() => {
        const savedBudget = localStorage.getItem('finance_budget');
        return savedBudget ? JSON.parse(savedBudget) : { monthlyBudget: 50000 };
    });

    useEffect(() => {
        localStorage.setItem('finance_transactions', JSON.stringify(transactions));
    }, [transactions]);

    useEffect(() => {
        localStorage.setItem('finance_budget', JSON.stringify(budget));
    }, [budget]);

    const addTransaction = (newTx) => {
        setTransactions([{ ...newTx, id: uuidv4() }, ...transactions]);
    }

    const deleteTransaction = (id) => {
        setTransactions(transactions.filter(transaction => transaction.id !== id));
    }

    const updateTransaction = (id, updatedData) => {
        setTransactions(transactions.map(t => t.id === id ? { ...t, ...updatedData } : t));
    }

    const updateBudget = (newAmount) => {
        setBudget({ monthlyBudget: newAmount })
    }

    const value = {
        transactions,
        budget,
        addTransaction,
        deleteTransaction,
        updateTransaction,
        updateBudget
    };

    return (
        <FinanceContext.Provider value={value}>
            {children}
        </FinanceContext.Provider>
    )
}