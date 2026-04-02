import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Layout({ toggleTheme, isDarkMode }) {
  return (
    <div className="flex h-screen w-full bg-gray-50 dark:bg-navy-base text-slate-900 dark:text-slate-200 font-sans transition-colors duration-300 overflow-hidden">
      
      <Sidebar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      
      <main className="flex-1 h-full overflow-y-auto">
        <div className="p-8 max-w-7xl mx-auto">
          {/* LOGIC: React Router will render your page components here */}
           
          <Outlet /> 
        </div>
      </main>

    </div>
  );
}