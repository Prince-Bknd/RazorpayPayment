import React, { useState, useEffect } from 'react';
import { CreditCard, TrendingUp, Users, DollarSign, Activity, CheckCircle, AlertTriangle } from 'lucide-react';
import { healthCheck } from '../utils/api';

const stats = [
  { name: 'Total Revenue', value: '₹2,45,678', change: '+12.5%', icon: DollarSign, color: 'from-green-500 to-green-600' },
  { name: 'Transactions', value: '1,234', change: '+8.2%', icon: CreditCard, color: 'from-blue-500 to-blue-600' },
  { name: 'Success Rate', value: '98.5%', change: '+2.1%', icon: TrendingUp, color: 'from-purple-500 to-purple-600' },
  { name: 'Active Users', value: '856', change: '+15.3%', icon: Users, color: 'from-amber-500 to-amber-600' },
];

const recentTransactions = [
  { id: 'pay_1234567890', amount: 999, status: 'success', customer: 'John Doe', time: '2 minutes ago' },
  { id: 'pay_1234567891', amount: 1999, status: 'success', customer: 'Jane Smith', time: '5 minutes ago' },
  { id: 'pay_1234567892', amount: 4999, status: 'pending', customer: 'Bob Johnson', time: '8 minutes ago' },
  { id: 'pay_1234567893', amount: 599, status: 'success', customer: 'Alice Brown', time: '12 minutes ago' },
  { id: 'pay_1234567894', amount: 299, status: 'failed', customer: 'Charlie Wilson', time: '15 minutes ago' },
];

export const Dashboard: React.FC = () => {
  const [serverStatus, setServerStatus] = useState<'connected' | 'disconnected' | 'checking'>('checking');
  const [serverInfo, setServerInfo] = useState<any>(null);

  useEffect(() => {
    checkServerHealth();
  }, []);

  const checkServerHealth = async () => {
    try {
      const data = await healthCheck();
      setServerInfo(data);
      setServerStatus('connected');
    } catch (error) {
      setServerStatus('disconnected');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Activity className="w-4 h-4 text-amber-500" />;
      case 'failed':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/50';
      case 'pending':
        return 'text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/50';
      case 'failed':
        return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/50';
      default:
        return 'text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-900/50';
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
          Payment Dashboard
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Monitor your payment transactions and revenue metrics
        </p>
      </div>

      {/* Server Status */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${
              serverStatus === 'connected' ? 'bg-green-500' : 
              serverStatus === 'disconnected' ? 'bg-red-500' : 'bg-amber-500'
            }`}></div>
            <div>
              <h3 className="font-semibold text-slate-800 dark:text-slate-100">
                Backend Server Status
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {serverStatus === 'connected' ? 'Connected and operational' :
                 serverStatus === 'disconnected' ? 'Disconnected - Please check your backend server' :
                 'Checking connection...'}
              </p>
            </div>
          </div>
          {serverInfo && (
            <div className="text-right">
              <p className="text-sm text-slate-600 dark:text-slate-400">Port: {serverInfo.port}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Razorpay: {serverInfo.razorpayConfigured ? 'Configured' : 'Not Configured'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    {stat.name}
                  </p>
                  <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                    {stat.value}
                  </p>
                  <p className="text-sm text-green-600 dark:text-green-400">
                    {stat.change}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
            Revenue Trend
          </h3>
          <div className="h-64 flex items-center justify-center bg-slate-50 dark:bg-slate-700/50 rounded-lg">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-slate-400 mx-auto mb-2" />
              <p className="text-slate-500 dark:text-slate-400">Revenue chart will be displayed here</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
            Recent Transactions
          </h3>
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  {getStatusIcon(transaction.status)}
                  <div>
                    <p className="font-medium text-slate-700 dark:text-slate-300">
                      {transaction.customer}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {transaction.id}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-slate-800 dark:text-slate-100">
                    ₹{transaction.amount.toLocaleString()}
                  </p>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {transaction.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="flex items-center space-x-3 p-4 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors duration-200">
            <CreditCard className="w-5 h-5 text-blue-500" />
            <span className="text-slate-700 dark:text-slate-300">View Products</span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-colors duration-200">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <span className="text-slate-700 dark:text-slate-300">Analytics</span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg transition-colors duration-200">
            <Users className="w-5 h-5 text-purple-500" />
            <span className="text-slate-700 dark:text-slate-300">Customers</span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-amber-50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-900/30 rounded-lg transition-colors duration-200">
            <Activity className="w-5 h-5 text-amber-500" />
            <span className="text-slate-700 dark:text-slate-300">Reports</span>
          </button>
        </div>
      </div>
    </div>
  );
};