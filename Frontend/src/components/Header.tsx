import React from 'react';
import { Moon, Sun, User, Bell, CreditCard } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { ConnectionStatus } from './ConnectionStatus';

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
            Razorpay Payment Gateway
          </h1>
          <div className="hidden md:flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
            <CreditCard className="w-4 h-4" />
            <span>Payment Management Dashboard</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Connection Status */}
          <ConnectionStatus />
          
          <button className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100 transition-colors duration-200">
            <Bell className="w-5 h-5" />
          </button>
          
          {/* Enhanced Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="relative p-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            <div className="relative">
              {theme === 'light' ? (
                <Moon className="w-5 h-5 transition-transform duration-300 hover:rotate-12" />
              ) : (
                <Sun className="w-5 h-5 transition-transform duration-300 hover:rotate-12" />
              )}
            </div>
            {/* Theme indicator dot */}
            <div className={`absolute -top-1 -right-1 w-2 h-2 rounded-full transition-all duration-300 ${
              theme === 'light' 
                ? 'bg-blue-500 shadow-lg shadow-blue-500/50' 
                : 'bg-amber-400 shadow-lg shadow-amber-400/50'
            }`} />
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
              Payment Admin
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};