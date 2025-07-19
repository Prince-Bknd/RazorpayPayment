import React, { useState, useEffect } from 'react';
import { Save, Key, Server, AlertTriangle, CheckCircle } from 'lucide-react';
import { getConfig, updateRazorpayConfig } from '../utils/api';
import toast from 'react-hot-toast';

export const ConfigForm: React.FC = () => {
  const [config, setConfig] = useState({
    razorpayKeyId: '',
    razorpayKeySecret: '',
    port: 5000
  });
  const [loading, setLoading] = useState(false);
  const [serverStatus, setServerStatus] = useState<'connected' | 'disconnected' | 'checking'>('checking');

  useEffect(() => {
    loadConfig();
    checkServerStatus();
  }, []);

  const loadConfig = async () => {
    try {
      const data = await getConfig();
      setConfig({
        razorpayKeyId: data.razorpayKeyId || '',
        razorpayKeySecret: '',
        port: data.port || 5000
      });
      setServerStatus(data.razorpayConfigured ? 'connected' : 'disconnected');
    } catch (error) {
      console.error('Failed to load config:', error);
      setServerStatus('disconnected');
    }
  };

  const checkServerStatus = async () => {
    try {
      await getConfig();
      setServerStatus('connected');
    } catch (error) {
      setServerStatus('disconnected');
    }
  };

  const handleSave = async () => {
    if (!config.razorpayKeyId || !config.razorpayKeySecret) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      await updateRazorpayConfig({
        keyId: config.razorpayKeyId,
        keySecret: config.razorpayKeySecret
      });
      toast.success('Configuration updated successfully!');
      setServerStatus('connected');
    } catch (error) {
      toast.error('Failed to update configuration');
      console.error('Config update error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <Key className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            Razorpay Configuration
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Configure your payment gateway settings
          </p>
        </div>
      </div>

      {/* Server Status */}
      <div className="mb-6">
        <div className="flex items-center space-x-3 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
          <Server className="w-5 h-5 text-slate-500" />
          <div className="flex-1">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Backend Server Status:
            </span>
            <div className="flex items-center space-x-2 mt-1">
              {serverStatus === 'connected' ? (
                <>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-600 dark:text-green-400">Connected</span>
                </>
              ) : serverStatus === 'disconnected' ? (
                <>
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-red-600 dark:text-red-400">Disconnected</span>
                </>
              ) : (
                <>
                  <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm text-blue-600 dark:text-blue-400">Checking...</span>
                </>
              )}
            </div>
          </div>
          <span className="text-sm text-slate-500 dark:text-slate-400">
            Port: {config.port}
          </span>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Razorpay Key ID
          </label>
          <input
            type="text"
            value={config.razorpayKeyId}
            onChange={(e) => setConfig({ ...config, razorpayKeyId: e.target.value })}
            placeholder="rzp_test_1234567890"
            className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800 dark:text-slate-100 font-mono"
          />
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Your Razorpay Key ID (starts with rzp_test_ for test mode)
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Razorpay Key Secret
          </label>
          <input
            type="password"
            value={config.razorpayKeySecret}
            onChange={(e) => setConfig({ ...config, razorpayKeySecret: e.target.value })}
            placeholder="Enter your secret key"
            className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800 dark:text-slate-100 font-mono"
          />
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Your Razorpay Key Secret (keep this secure and never share publicly)
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Backend Server Port
          </label>
          <input
            type="number"
            value={config.port}
            onChange={(e) => setConfig({ ...config, port: parseInt(e.target.value) || 5000 })}
            className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800 dark:text-slate-100"
          />
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Port where your backend server is running (default: 5000)
          </p>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
                Important Security Notes
              </h4>
              <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
                <li>• Use test keys for development and live keys for production</li>
                <li>• Never expose your secret key in frontend code</li>
                <li>• Keep your credentials secure and rotate them regularly</li>
                <li>• Enable webhook signatures for production environments</li>
              </ul>
            </div>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-slate-400 disabled:to-slate-500 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Save className="w-5 h-5" />
          )}
          <span>{loading ? 'Saving...' : 'Save Configuration'}</span>
        </button>
      </div>
    </div>
  );
};