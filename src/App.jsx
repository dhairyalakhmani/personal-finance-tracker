import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";

import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import TransactionForm from "./pages/TransactionForm";
import Budget from "./pages/Budget";

function App() {
  const[isDarkMode, setIsDarkMode] = useState(true);

  function toggleTheme(){
    setIsDarkMode(!isDarkMode);
  }

  useEffect(() => {
    if(isDarkMode)
      document.documentElement.classList.add('dark');
    else
      document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout toggleTheme={toggleTheme} isDarkMode={isDarkMode} />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />}></Route>
          <Route path="transactions" element={<Transactions />}></Route>
          <Route path="/transactions/edit/:id" element={<TransactionForm />} />
          <Route path="transactions/new" element={<TransactionForm />}></Route>
          <Route path="budget" element={<Budget />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
