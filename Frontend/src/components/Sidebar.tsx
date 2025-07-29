import React, { useEffect, useRef } from 'react';
<<<<<<< HEAD
import { LayoutDashboard, CreditCard, Settings, BarChart3, HelpCircle, Zap } from 'lucide-react';
=======
import { LayoutDashboard, ShoppingBag, Settings, BarChart3, HelpCircle, Zap } from 'lucide-react';
>>>>>>> 22522e5c43e76b9826dd26dbe3beafc7a84e5c1b
import { useRouter } from '../hooks/useRouter';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
<<<<<<< HEAD
  { name: 'Payments', href: '/payments', icon: CreditCard },
=======
  { name: 'Products', href: '/products', icon: ShoppingBag },
>>>>>>> 22522e5c43e76b9826dd26dbe3beafc7a84e5c1b
  { name: 'Configuration', href: '/config', icon: Settings },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Help', href: '/help', icon: HelpCircle },
];

export const Sidebar: React.FC = () => {
  const { currentPath, navigate } = useRouter();
  const navRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const idx = navigation.findIndex(item => item.href === currentPath);
      if (e.key === 'ArrowDown') {
        const next = (idx + 1) % navigation.length;
        navRefs.current[next]?.focus();
      } else if (e.key === 'ArrowUp') {
        const prev = (idx - 1 + navigation.length) % navigation.length;
        navRefs.current[prev]?.focus();
      } else if (e.key === 'Enter') {
        navigate(currentPath);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPath, navigate]);

  return (
    <div className="w-64 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border-r border-slate-200 dark:border-slate-700 min-h-screen">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
              Razorpay
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Payment Gateway</p>
          </div>
        </div>
        
        <nav className="space-y-2">
          {navigation.map((item, i) => {
            const Icon = item.icon;
            const isActive = currentPath === item.href;
            return (
              <button
                key={item.name}
                ref={el => navRefs.current[i] = el}
                onClick={() => navigate(item.href)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 relative focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  isActive
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-slate-100'
                }`}
                tabIndex={0}
                aria-current={isActive ? 'page' : undefined}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-purple-500 rounded-r-lg" aria-hidden="true"></span>
                )}
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};