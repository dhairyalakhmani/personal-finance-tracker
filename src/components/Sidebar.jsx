import { NavLink } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import { 
    FiPieChart, 
    FiList, 
    FiPlusCircle, 
    FiTarget, 
    FiActivity, 
    FiChevronLeft, 
    FiChevronRight,
    FiMoon,
    FiSun
} from 'react-icons/fi';

export default function Sidebar({ toggleTheme, isDarkMode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(256); 

  const MIN_WIDTH = 200;
  const MAX_WIDTH = 400;
  const COLLAPSED_WIDTH = 80;

  const sidebarRef = useRef(null);

  const startResizing = useCallback((e) => {
    setIsResizing(true);
    e.preventDefault();
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback((e) => {
    if(isResizing){
      const newWidth = e.clientX;
      if(newWidth >= MIN_WIDTH && newWidth <= MAX_WIDTH)
        setSidebarWidth(newWidth);
    }
  }, [isResizing]);

  useEffect(() => {
    if(isResizing) {
      window.addEventListener('mousemove', resize);
      window.addEventListener('mouseup', stopResizing);
    }
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    }
  }, [isResizing, resize, stopResizing]);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: FiPieChart },
    { name: 'Transactions', path: '/transactions', icon: FiList },
    { name: 'Add New', path: '/transactions/new', icon: FiPlusCircle },
    { name: 'Budget', path: '/budget', icon: FiTarget },
  ];

  return (
        <aside 
            ref={sidebarRef}
            className={`relative flex flex-col bg-white dark:bg-navy-surface text-slate-800 dark:text-slate-100 border-r border-gray-200 dark:border-navy-border h-screen shrink-0 ${isResizing ? '' : 'transition-all duration-300 ease-in-out'}`}
            style={{ width: isCollapsed ? COLLAPSED_WIDTH : sidebarWidth }}
        >
            <div className="flex items-center justify-between p-4 h-20 border-b border-gray-200 dark:border-navy-border relative">
                <div className="flex items-center gap-3 overflow-hidden whitespace-nowrap">
                    <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-600/20">
                        <FiActivity className="w-6 h-6 text-white" />
                    </div>
                    <span className={`font-bold text-xl text-slate-800 dark:text-slate-100 tracking-wide transition-opacity duration-300 ${isCollapsed ? 'opacity-0 hidden' : 'opacity-100'}`}>
                        FinTrack
                    </span>
                </div>

                <button 
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="absolute -right-3.5 top-7 w-7 h-7 bg-white dark:bg-navy-surface border border-gray-200 dark:border-navy-border rounded-full flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors z-50 shadow-sm text-slate-500 dark:text-slate-400"
                >
                    {isCollapsed ? <FiChevronRight className="w-4 h-4" /> : <FiChevronLeft className="w-4 h-4" />}
                </button>
            </div>

            <div className="flex-1 px-3 py-6 space-y-1 overflow-y-auto custom-scrollbar overflow-x-hidden">
                {navItems.map((item) => (
                    <NavLink 
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) => 
                            `w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-200 font-medium group relative ${
                                isActive 
                                    ? 'bg-slate-100 dark:bg-slate-800/50 text-indigo-600 dark:text-indigo-400 shadow-sm'
                                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/30 hover:text-slate-900 dark:hover:text-slate-100'
                            }`
                        }
                        title={isCollapsed ? item.name : ""}
                    >
                        <item.icon className={`w-5 h-5 shrink-0 ${isCollapsed ? 'mx-auto' : ''}`} />
                        
                        {!isCollapsed && (
                            <span className="whitespace-nowrap truncate">
                                {item.name}
                            </span>
                        )}
                    </NavLink>
                ))}
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-navy-border">
                <button 
                    onClick={toggleTheme}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/30 hover:text-slate-900 dark:hover:text-slate-100 transition-colors duration-200 group ${isCollapsed ? 'justify-center' : ''}`}
                    title={isCollapsed ? (isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode") : ""}
                >
                    {isDarkMode ? (
                        <FiSun className="w-5 h-5 shrink-0" />
                    ) : (
                        <FiMoon className="w-5 h-5 shrink-0" />
                    )}
                    
                    {!isCollapsed && (
                        <span className="font-medium whitespace-nowrap truncate">
                            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                        </span>
                    )}
                </button>
            </div>

            {!isCollapsed && (
                <div 
                    className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-indigo-500 active:bg-indigo-600 z-40 transition-colors"
                    onMouseDown={startResizing}
                />
            )}
        </aside>
    );
}