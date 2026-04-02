import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";

import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import AddTransaction from "./pages/AddTransaction";
import Budget from "./pages/Budget";
import Analytics from "./pages/Analytics";

function App() {
  const[isDarkMode, setIsDarkMode] = useState(false);

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
          <Route path="transactions/new" element={<AddTransaction />}></Route>
          <Route path="budget" element={<Budget />}></Route>
          <Route path="analytics" element={<Analytics />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
