import { useTransactions } from "../hooks/useTransactions";

export default function Dashboard() {
    const { transactions } = useTransactions();
    console.log(transactions);
    return(
        <div>Dashboard</div>
    )
}