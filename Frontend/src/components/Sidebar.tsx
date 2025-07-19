import React from 'react';
import { LayoutDashboard, ShoppingBag, CreditCard, Settings, BarChart3, HelpCircle, Zap } from 'lucide-react';
import { useRouter } from '../hooks/useRouter';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Products', href: '/products', icon: ShoppingBag },
  { name: 'Payments', href: '/payments', icon: CreditCard },
  { name: 'Configuration', href: '/config', icon: Settings },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Help', href: '/help', icon: HelpCircle },
];

export const Sidebar: React.FC = () => {
  const { currentPath, navigate } = useRouter();

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
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.href;
            
            return (
              <button
                key={item.name}
                onClick={() => navigate(item.href)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-slate-100'
                }`}
              >
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