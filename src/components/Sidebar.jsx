import { NavLink } from 'react-router-dom';
import { FiPieChart, FiList, FiPlusCircle, FiTarget, FiTrendingUp, FiMoon, FiSun } from 'react-icons/fi';

export default function Sidebar({ toggleTheme, isDarkMode }) {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <FiPieChart className="w-5 h-5" /> },
    { name: 'Transactions', path: '/transactions', icon: <FiList className="w-5 h-5" /> },
    { name: 'Add New', path: '/transactions/new', icon: <FiPlusCircle className="w-5 h-5" /> },
    { name: 'Budget', path: '/budget', icon: <FiTarget className="w-5 h-5" /> },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-navy-surface border-r border-gray-200 dark:border-navy-border h-screen hidden md:flex flex-col transition-colors duration-300">
      
      <div className="p-6 border-b border-gray-200 dark:border-navy-border">
        <h1 className="text-2xl font-semibold text-slate-800 dark:text-slate-100 tracking-tight">
          FinTrack
        </h1>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 font-medium ${
                isActive
                  ? 'bg-slate-100 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/30 hover:text-slate-700 dark:hover:text-slate-300'
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-navy-border">
        <button 
          onClick={toggleTheme}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-md text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors duration-200"
        >
          {isDarkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
          <span className="font-medium">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
      </div>
    </aside>
  );
}