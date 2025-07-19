import React from 'react';
import { BarChart3, TrendingUp, PieChart, Calendar, Download, Filter } from 'lucide-react';

export const Analytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
          Analytics & Reports
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Comprehensive analytics and insights for your payment transactions
        </p>
      </div>

      {/* Time Period Selector */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex items-center space-x-4">
            <Calendar className="w-5 h-5 text-slate-500" />
            <select className="px-4 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800 dark:text-slate-100">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 3 months</option>
              <option>Last 6 months</option>
              <option>Last year</option>
              <option>Custom range</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center space-x-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors duration-200">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Revenue</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">₹2,45,678</p>
              <p className="text-sm text-green-600 dark:text-green-400">+12.5% from last month</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Transaction Volume</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">1,234</p>
              <p className="text-sm text-blue-600 dark:text-blue-400">+8.2% from last month</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Success Rate</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">98.5%</p>
              <p className="text-sm text-green-600 dark:text-green-400">+2.1% from last month</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
              <PieChart className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Avg. Transaction</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">₹1,992</p>
              <p className="text-sm text-amber-600 dark:text-amber-400">+5.7% from last month</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
            Revenue Trend
          </h3>
          <div className="h-64 flex items-center justify-center bg-slate-50 dark:bg-slate-700/50 rounded-lg">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-slate-400 mx-auto mb-2" />
              <p className="text-slate-500 dark:text-slate-400">Revenue chart will be displayed here</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
            Payment Methods Distribution
          </h3>
          <div className="h-64 flex items-center justify-center bg-slate-50 dark:bg-slate-700/50 rounded-lg">
            <div className="text-center">
              <PieChart className="w-12 h-12 text-slate-400 mx-auto mb-2" />
              <p className="text-slate-500 dark:text-slate-400">Payment methods chart will be displayed here</p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Analytics */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-6">
          Payment Method Performance
        </h3>
        <div className="space-y-4">
          {[
            { method: 'UPI', transactions: 456, revenue: '₹89,234', successRate: '99.2%', color: 'purple' },
            { method: 'Credit Card', transactions: 234, revenue: '₹67,890', successRate: '97.8%', color: 'blue' },
            { method: 'Debit Card', transactions: 189, revenue: '₹45,123', successRate: '98.1%', color: 'green' },
            { method: 'Net Banking', transactions: 167, revenue: '₹34,567', successRate: '96.5%', color: 'amber' },
            { method: 'Wallet', transactions: 123, revenue: '₹23,456', successRate: '99.5%', color: 'red' }
          ].map((item) => (
            <div key={item.method} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full bg-${item.color}-500`}></div>
                <div>
                  <p className="font-medium text-slate-800 dark:text-slate-100">{item.method}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{item.transactions} transactions</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-slate-800 dark:text-slate-100">{item.revenue}</p>
                <p className="text-sm text-green-600 dark:text-green-400">{item.successRate} success</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};