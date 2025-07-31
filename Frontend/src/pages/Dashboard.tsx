import React, { useState, useEffect, useCallback } from 'react';
import { 
  CreditCard, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Activity, 
  CheckCircle, 
  AlertTriangle,
  Zap,
  RefreshCw,
  Play,
  Pause,
  Target,
  Award,
  Sparkles,
  Rocket,
  Timer,
  BarChart3,
  PieChart,
  LineChart
} from 'lucide-react';
import { healthCheck } from '../utils/api';
import { useRouter } from '../hooks/useRouter';

interface LiveTransaction {
  id: string;
  amount: number;
  status: 'success' | 'pending' | 'failed';
  customer: string;
  time: string;
  method: string;
}

export const Dashboard: React.FC = () => {
  const { navigate } = useRouter();
  const [serverStatus, setServerStatus] = useState<'connected' | 'disconnected' | 'checking'>('checking');
  const [serverInfo, setServerInfo] = useState<any>(null);
  const [isLive, setIsLive] = useState(true);
  const [liveTransactions, setLiveTransactions] = useState<LiveTransaction[]>([]);
  const [currentMetric, setCurrentMetric] = useState(0);
  const [animatedValue, setAnimatedValue] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Dynamic stats with animations
  const dynamicStats = [
    { 
      name: 'Live Revenue', 
      value: animatedValue.toLocaleString('en-IN'),
      change: '+12.5%', 
      icon: DollarSign, 
      color: 'from-green-500 to-green-600',
      description: 'Real-time earnings'
    },
    { 
      name: 'Active Sessions', 
      value: Math.floor(Math.random() * 100) + 50, 
      change: '+8.2%', 
      icon: Users, 
      color: 'from-blue-500 to-blue-600',
      description: 'Current users'
    },
    { 
      name: 'Success Rate', 
      value: '98.5%', 
      change: '+2.1%', 
      icon: TrendingUp, 
      color: 'from-purple-500 to-purple-600',
      description: 'Payment success'
    },
    { 
      name: 'Processing', 
      value: liveTransactions.filter(t => t.status === 'pending').length, 
      change: '+15.3%', 
      icon: Activity, 
      color: 'from-amber-500 to-amber-600',
      description: 'Pending payments'
    },
  ];

  // Sample customer names for live transactions
  const customerNames = [
    'Alex Chen', 'Maria Garcia', 'David Kim', 'Sarah Johnson', 'Raj Patel',
    'Emma Wilson', 'Michael Brown', 'Lisa Anderson', 'James Taylor', 'Priya Singh'
  ];

  const paymentMethods = ['Card', 'UPI', 'Net Banking', 'Wallet'];

  // Generate random live transaction
  const generateLiveTransaction = useCallback((): LiveTransaction => {
    const statuses: ('success' | 'pending' | 'failed')[] = ['success', 'pending', 'failed'];
    const weights = [0.7, 0.2, 0.1]; // 70% success, 20% pending, 10% failed
    
    const random = Math.random();
    let status: 'success' | 'pending' | 'failed' = 'success';
    let cumulativeWeight = 0;
    
    for (let i = 0; i < weights.length; i++) {
      cumulativeWeight += weights[i];
      if (random <= cumulativeWeight) {
        status = statuses[i];
        break;
      }
    }

    return {
      id: `pay_${Math.random().toString(36).substr(2, 9)}`,
      amount: Math.floor(Math.random() * 5000) + 100,
      status,
      customer: customerNames[Math.floor(Math.random() * customerNames.length)],
      time: 'Just now',
      method: paymentMethods[Math.floor(Math.random() * paymentMethods.length)]
    };
  }, []);

  // Simulate live transactions
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      const newTransaction = generateLiveTransaction();
      setLiveTransactions(prev => [newTransaction, ...prev.slice(0, 9)]);
      
      // Update animated revenue value
      if (newTransaction.status === 'success') {
        setAnimatedValue(prev => prev + newTransaction.amount);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isLive, generateLiveTransaction]);

  // Animate revenue counter
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedValue(prev => prev + Math.floor(Math.random() * 100) + 50);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Rotate through different metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMetric(prev => (prev + 1) % dynamicStats.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [dynamicStats.length]);

  // Check server health only once when component mounts
  useEffect(() => {
    // Only check once when dashboard loads
    checkServerHealth();
  }, []);

  const checkServerHealth = async () => {
    setIsRefreshing(true);
    try {
      const data = await healthCheck();
      setServerInfo(data);
      setServerStatus('connected');
    } catch (error) {
      setServerStatus('disconnected');
    } finally {
      setIsRefreshing(false);
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

  const getMethodColor = (method: string) => {
    const colors = {
      'Card': 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300',
      'UPI': 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300',
      'Net Banking': 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300',
      'Wallet': 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300'
    };
    return colors[method as keyof typeof colors] || colors['Card'];
  };

  return (
    <div className="space-y-6">
      {/* Dynamic Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
              Payment Dashboard
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Monitor your payment transactions and revenue metrics
            </p>
          </div>
                     {serverStatus === 'disconnected' ? (
             <button
               onClick={checkServerHealth}
               disabled={isRefreshing}
               className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                 isRefreshing 
                   ? 'bg-amber-500 text-white cursor-not-allowed' 
                   : 'bg-red-500 hover:bg-red-600 text-white hover:scale-105'
               }`}
             >
               <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : 'hover:rotate-180 transition-transform duration-300'}`} />
               <span>{isRefreshing ? 'Connecting...' : 'Try Connect'}</span>
               {isRefreshing && (
                 <div className="flex space-x-1">
                   <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                   <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                   <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                 </div>
               )}
             </button>
           ) : (
             <button
               onClick={checkServerHealth}
               disabled={isRefreshing}
               className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                 isRefreshing 
                   ? 'bg-amber-500 text-white cursor-not-allowed' 
                   : 'bg-blue-500 hover:bg-blue-600 text-white hover:scale-105'
               }`}
             >
               <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : 'hover:rotate-180 transition-transform duration-300'}`} />
               <span>{isRefreshing ? 'Connecting...' : 'Refresh Status'}</span>
               {isRefreshing && (
                 <div className="flex space-x-1">
                   <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                   <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                   <div className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                 </div>
               )}
             </button>
           )}
        </div>
      </div>

      {/* Server Status with Animation */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className={`w-4 h-4 rounded-full ${
                serverStatus === 'connected' ? 'bg-green-500 animate-pulse' : 
                serverStatus === 'disconnected' ? 'bg-red-500 animate-pulse' : 
                'bg-amber-500 animate-ping'
              }`}></div>
              {serverStatus === 'checking' && (
                <div className="absolute inset-0 w-4 h-4 rounded-full bg-amber-400 animate-ping" style={{ animationDelay: '0.5s' }}></div>
              )}
              {serverStatus === 'connected' && (
                <div className="absolute inset-0 w-4 h-4 rounded-full bg-green-400 animate-ping" style={{ animationDelay: '0.3s' }}></div>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 dark:text-slate-100 flex items-center">
                <Zap className={`w-5 h-5 text-blue-500 mr-2 ${
                  serverStatus === 'checking' ? 'animate-spin' : 
                  serverStatus === 'connected' ? 'animate-pulse' : ''
                }`} />
                Backend Server Status
              </h3>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                {serverStatus === 'connected' ? (
                  <span className="flex items-center">
                    <span className="mr-2">Connected and operational</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                  </span>
                ) : serverStatus === 'disconnected' ? (
                  'Disconnected - Please check your backend server'
                ) : (
                  <span className="flex items-center">
                    <span className="mr-2">Connecting to server...</span>
                    <div className="flex space-x-1">
                      <div className="w-1 h-1 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-1 h-1 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-1 h-1 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {serverStatus === 'checking' && (
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-amber-600 dark:text-amber-400 animate-pulse">Connecting...</span>
              </div>
            )}
            {serverStatus === 'connected' && (
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-600 dark:text-green-400">Live</span>
              </div>
            )}
            {serverStatus === 'disconnected' && (
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-red-600 dark:text-red-400">Offline</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dynamicStats.map((stat, index) => {
          const Icon = stat.icon;
          const isActive = index === currentMetric;
          return (
            <div
              key={stat.name}
              className={`bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                isActive ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setCurrentMetric(index)}
            >
              <div className="flex items-center">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center ${
                  isActive ? 'animate-pulse' : ''
                }`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    {stat.name}
                  </p>
                  <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                    {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                  </p>
                  <p className="text-sm text-green-600 dark:text-green-400 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {stat.change}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Transactions Feed */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 flex items-center">
            <Rocket className="w-5 h-5 text-blue-500 mr-2" />
            Live Transactions
            {isLive && <div className="ml-2 w-2 h-2 bg-green-500 rounded-full animate-ping"></div>}
          </h3>
          <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
            <Timer className="w-4 h-4" />
            <span>Real-time updates</span>
          </div>
        </div>
        
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {liveTransactions.length === 0 ? (
            <div className="text-center py-8">
              <Activity className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <p className="text-slate-500 dark:text-slate-400">Waiting for transactions...</p>
            </div>
          ) : (
            liveTransactions.map((transaction, index) => (
              <div
                key={transaction.id}
                className={`flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg border-l-4 ${
                  transaction.status === 'success' ? 'border-l-green-500' :
                  transaction.status === 'pending' ? 'border-l-amber-500' : 'border-l-red-500'
                } transform transition-all duration-300 ${
                  index === 0 ? 'animate-pulse' : ''
                }`}
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
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMethodColor(transaction.method)}`}>
                      {transaction.method}
                    </span>
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
            ))
          )}
        </div>
      </div>

      {/* Interactive Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4 flex items-center">
            <BarChart3 className="w-5 h-5 text-blue-500 mr-2" />
            Revenue Analytics
          </h3>
          <div className="h-48 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
            <div className="text-center">
              <TrendingUp className="w-12 h-12 text-blue-500 mx-auto mb-2 animate-bounce" />
              <p className="text-slate-600 dark:text-slate-400">Interactive chart coming soon</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4 flex items-center">
            <PieChart className="w-5 h-5 text-green-500 mr-2" />
            Payment Methods
          </h3>
          <div className="h-48 flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg">
            <div className="text-center">
              <CreditCard className="w-12 h-12 text-green-500 mx-auto mb-2 animate-pulse" />
              <p className="text-slate-600 dark:text-slate-400">Method distribution</p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4 flex items-center">
            <LineChart className="w-5 h-5 text-purple-500 mr-2" />
            Success Rate
          </h3>
          <div className="h-48 flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
            <div className="text-center">
              <Award className="w-12 h-12 text-purple-500 mx-auto mb-2 animate-spin" style={{ animationDuration: '3s' }} />
              <p className="text-slate-600 dark:text-slate-400">Performance metrics</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button 
            onClick={() => navigate('/payments')}
            className="flex items-center space-x-3 p-4 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            <CreditCard className="w-5 h-5 text-blue-500" />
            <span className="text-slate-700 dark:text-slate-300">Make Payment</span>
          </button>
          <button 
            onClick={() => navigate('/analytics')}
            className="flex items-center space-x-3 p-4 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            <TrendingUp className="w-5 h-5 text-green-500" />
            <span className="text-slate-700 dark:text-slate-300">Analytics</span>
          </button>
          <button 
            onClick={() => navigate('/config')}
            className="flex items-center space-x-3 p-4 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            <Users className="w-5 h-5 text-purple-500" />
            <span className="text-slate-700 dark:text-slate-300">Settings</span>
          </button>
          <button 
            onClick={() => navigate('/help')}
            className="flex items-center space-x-3 p-4 bg-amber-50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-900/30 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            <Activity className="w-5 h-5 text-amber-500" />
            <span className="text-slate-700 dark:text-slate-300">Help</span>
          </button>
        </div>
      </div>
    </div>
  );
};