import { useContext } from "react";
import { FinanceContext } from "../contexts/FinanceContext";

export function useTransactions() {
    const context = useContext(FinanceContext);
    if(!context) {
        throw new Error('useTransactions must be used within a finance provider');
    }
    return context;
}