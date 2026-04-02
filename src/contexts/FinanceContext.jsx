import { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

// eslint-disable-next-line react-refresh/only-export-components
export const FinanceContext = createContext();

const mockTransactions = [
  { id: uuidv4(), title: 'Monthly Salary', amount: 85000, category: 'Income', type: 'income', date: new Date().toISOString(), notes: 'Tech Corp', recurring: true },
  { id: uuidv4(), title: 'Apartment Rent', amount: 25000, category: 'Rent', type: 'expense', date: new Date().toISOString(), notes: 'April Rent', recurring: true },
  { id: uuidv4(), title: 'Grocery Run', amount: 4500, category: 'Food', type: 'expense', date: new Date().toISOString(), notes: 'Weekly supplies', recurring: false },
  { id: uuidv4(), title: 'Netflix', amount: 649, category: 'Subscriptions', type: 'expense', date: new Date().toISOString(), notes: 'Standard Plan', recurring: true },
];

export function FinanceProvider({ children }) {
    const[transactions, setTransactions] = useState(mockTransactions);
    const[budget, setBudget] = useState({monthlyBudget: 50000});

    const addTransaction = (newTx) => {
        setTransactions([{...newTx, id: uuidv4()}, ...transactions]);
    }

    const deleteTransaction = (id) => {
        setTransactions(transactions.filter(transaction => transaction.id !== id));
    }

    const updateTransaction = (id, updatedData) => {
        setTransactions(transactions.map(t => t.id === id ? { ...t, ...updatedData } : t));
    }

    const updateBudget = (newAmount) => {
        setBudget({monthlyBudget: newAmount})
    }

    const value = {
    transactions,
    budget,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    updateBudget
  };

  return(
    <FinanceContext.Provider value={value}>
        {children}
    </FinanceContext.Provider>
  )

}