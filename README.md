# 📊 Personal Finance Dashboard

A production-ready, client-side personal finance application built with React. This application provides users with a comprehensive dashboard to track incomes, expenses, budgets, and live currency exchange rates, all while ensuring data persistence through local browser storage.

## ✨ Key Features

* **Complete Transaction Management:** Add, edit, and delete income and expense records with strict form validation (protecting against HTML temporal bugs like 6-digit years).
* **Smart Categorization & Sorting:** Filter transactions by type or category, and dynamically sort the ledger by Date (Newest/Oldest) or Amount (Highest/Lowest).
* **Recurring Expense Tracking:** Visually tag and isolate fixed, recurring transactions (like rent or subscriptions) from variable spending to combat subscription creep.
* **Live Visual Analytics:** Real-time expense breakdowns visualized through responsive, interactive SVGs using Recharts.
* **Live Currency Converter:** Real-time foreign exchange rate calculations powered by the Frankfurter API, utilizing Axios and debounced network requests.
* **Zero-Loss Data Persistence:** Implements lazy-initialized state and React Context to seamlessly sync all financial data to `localStorage` without performance bottlenecks.
* **Premium UI/UX:** Fully responsive design built with Tailwind CSS, featuring symmetrical grid layouts, graceful text truncation, conditional empty states, and seamless light/dark mode support.

## 🛠 Tech Stack

* **Frontend Framework:** React 18 (via Vite)
* **Styling:** Tailwind CSS
* **State Management:** React Context API + LocalStorage
* **Data Visualization:** Recharts
* **Network Requests:** Axios
* **Routing:** React Router DOM (if applicable)
* **Icons:** React Icons (`react-icons/fi`)
* **Utilities:** `uuid` for unique identifiers, `date-fns` for time manipulation.

## 🚀 Architecture Highlights

### 1. The Context Vault (State & Persistence)
The application avoids prop-drilling by managing global state through a centralized `FinanceContext`. It utilizes lazy-initialization in the `useState` hooks to prevent expensive `JSON.parse()` operations on every render, strictly writing to `localStorage` via `useEffect` sync engines.

### 2. Network Proxy & CORS Handling
To ensure a smooth developer experience while building the Currency Converter, the app utilizes a Vite proxy (`vite.config.js`) to bypass browser CORS restrictions during local development. It seamlessly switches to direct API calls in production using Vite's `import.meta.env.MODE`.

### 3. Debounced API Calls
The currency converter prevents API rate-limiting by utilizing Javascript `setTimeout` clearing to debounce user inputs, ensuring network requests are only fired after the user has paused typing for 500ms.

## 💻 Running Locally

To get this project up and running on your local machine:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/yourusername/finance-dashboard.git](https://github.com/yourusername/finance-dashboard.git)
2. **Navigate to the directory:**
    ```bash
    cd finance-dashboard
3. **Install depencies:**
    ```bash
    npm install
4. **Start the development server:**
    ```bash
    npm run dev
