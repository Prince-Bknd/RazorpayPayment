import React from 'react';
import { ConfigForm } from '../components/ConfigForm';
import { RAZORPAY_CONFIG_INFO } from '../utils/constants';
import { Info, Key, Server, Shield } from 'lucide-react';

export const Configuration: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
          Configuration
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Configure your Razorpay payment gateway settings and server configuration
        </p>
      </div>

      {/* Configuration Info */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-2xl p-6">
        <div className="flex items-start space-x-3">
          <Info className="w-6 h-6 text-blue-500 mt-1" />
          <div>
            <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
              Configuration Guide
            </h3>
            <div className="text-sm text-blue-700 dark:text-blue-300 whitespace-pre-line">
              {RAZORPAY_CONFIG_INFO}
            </div>
          </div>
        </div>
      </div>

      {/* Configuration Form */}
      <ConfigForm />

      {/* Additional Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
              <Server className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
              Server Configuration
            </h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-slate-600 dark:text-slate-400">Backend URL</span>
              <span className="text-slate-800 dark:text-slate-100 font-mono">http://localhost:5000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600 dark:text-slate-400">Frontend URL</span>
              <span className="text-slate-800 dark:text-slate-100 font-mono">http://localhost:5173</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600 dark:text-slate-400">Environment</span>
              <span className="px-2 py-1 bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 rounded text-sm">
                Development
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600 dark:text-slate-400">CORS Enabled</span>
              <span className="px-2 py-1 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded text-sm">
                Yes
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
              Security Settings
            </h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-slate-600 dark:text-slate-400">Webhook Signature</span>
              <span className="px-2 py-1 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded text-sm">
                Enabled
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600 dark:text-slate-400">SSL/TLS</span>
              <span className="px-2 py-1 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded text-sm">
                Required
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600 dark:text-slate-400">API Rate Limiting</span>
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded text-sm">
                1000/hour
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600 dark:text-slate-400">Payment Timeout</span>
              <span className="text-slate-800 dark:text-slate-100">15 minutes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Environment Variables */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
            <Key className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
            Environment Variables
          </h3>
        </div>
        <div className="bg-slate-900 dark:bg-slate-950 rounded-lg p-4">
          <pre className="text-sm text-slate-300 font-mono">
{`# Backend Environment Variables (.env)
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
PORT=5000
FRONTEND_URL=http://localhost:5173
NODE_ENV=development`}
          </pre>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
          Make sure to create a .env file in your backend directory with these variables
        </p>
      </div>
    </div>
  );
};