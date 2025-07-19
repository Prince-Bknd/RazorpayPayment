import React from 'react';
import { CreditCard, CheckCircle, Clock, XCircle, Search, Filter, Download } from 'lucide-react';

const paymentHistory = [
  {
    id: 'pay_1234567890',
    orderId: 'order_1234567890',
    amount: 999,
    currency: 'INR',
    status: 'captured',
    method: 'card',
    customer: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+91 9999999999'
    },
    createdAt: '2024-01-15T14:30:22Z',
    description: 'Premium Subscription'
  },
  {
    id: 'pay_1234567891',
    orderId: 'order_1234567891',
    amount: 1999,
    currency: 'INR',
    status: 'captured',
    method: 'upi',
    customer: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+91 8888888888'
    },
    createdAt: '2024-01-15T13:15:45Z',
    description: 'Pro Plan'
  },
  {
    id: 'pay_1234567892',
    orderId: 'order_1234567892',
    amount: 4999,
    currency: 'INR',
    status: 'authorized',
    method: 'netbanking',
    customer: {
      name: 'Bob Johnson',
      email: 'bob@example.com',
      phone: '+91 7777777777'
    },
    createdAt: '2024-01-15T12:00:18Z',
    description: 'Enterprise Solution'
  },
  {
    id: 'pay_1234567893',
    orderId: 'order_1234567893',
    amount: 599,
    currency: 'INR',
    status: 'captured',
    method: 'wallet',
    customer: {
      name: 'Alice Brown',
      email: 'alice@example.com',
      phone: '+91 6666666666'
    },
    createdAt: '2024-01-15T11:45:33Z',
    description: 'API Credits'
  },
  {
    id: 'pay_1234567894',
    orderId: 'order_1234567894',
    amount: 299,
    currency: 'INR',
    status: 'failed',
    method: 'card',
    customer: {
      name: 'Charlie Wilson',
      email: 'charlie@example.com',
      phone: '+91 5555555555'
    },
    createdAt: '2024-01-15T10:20:10Z',
    description: 'Storage Plan'
  }
];

export const Payments: React.FC = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'captured':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'authorized':
        return <Clock className="w-4 h-4 text-amber-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-slate-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'captured':
        return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/50';
      case 'authorized':
        return 'text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/50';
      case 'failed':
        return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/50';
      default:
        return 'text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-900/50';
    }
  };

  const getMethodBadge = (method: string) => {
    const colors = {
      card: 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300',
      upi: 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300',
      netbanking: 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300',
      wallet: 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300'
    };
    
    return colors[method as keyof typeof colors] || colors.card;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
          Payment Transactions
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          View and manage all payment transactions
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Successful</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">1,234</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Pending</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">45</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
              <XCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Failed</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">23</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Volume</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">₹2.4L</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search transactions..."
                className="pl-10 pr-4 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800 dark:text-slate-100"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors duration-200">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
            Recent Transactions
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-700/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Payment ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-600">
              {paymentHistory.map((payment) => (
                <tr key={payment.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="font-mono text-sm text-slate-800 dark:text-slate-100">
                        {payment.id}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {payment.description}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="font-medium text-slate-800 dark:text-slate-100">
                        {payment.customer.name}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        {payment.customer.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-semibold text-slate-800 dark:text-slate-100">
                      ₹{payment.amount.toLocaleString()}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {payment.currency}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getMethodBadge(payment.method)}`}>
                      {payment.method.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(payment.status)}
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                        {payment.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">
                    {formatDate(payment.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium transition-colors duration-200">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};