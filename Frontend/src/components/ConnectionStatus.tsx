import React from 'react';
import { Wifi, WifiOff, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';
import { useConnectionStatus } from '../hooks/useConnectionStatus';
import toast from 'react-hot-toast';

export const ConnectionStatus: React.FC = () => {
  const { isConnected, isChecking, lastChecked, error, reconnect } = useConnectionStatus();

  const handleReconnect = async () => {
    try {
      await reconnect();
             if (isConnected) {
         toast.success('Successfully reconnected to server!');
       }
         } catch (error) {
       toast.error('Failed to reconnect to server');
     }
  };

  const getStatusColor = () => {
    if (isChecking) return 'text-yellow-500';
    if (isConnected) return 'text-green-500';
    return 'text-red-500';
  };

  const getStatusIcon = () => {
    if (isChecking) return <RefreshCw className="w-4 h-4 animate-spin" />;
    if (isConnected) return <CheckCircle className="w-4 h-4" />;
    return <AlertCircle className="w-4 h-4" />;
  };

  const getStatusText = () => {
    if (isChecking) return 'Checking...';
    if (isConnected) return 'Connected';
    return 'Disconnected';
  };

  return (
    <div className="flex items-center space-x-3">
      {/* Connection Status Indicator */}
      <div className="flex items-center space-x-2">
        <div className={`flex items-center space-x-1 ${getStatusColor()}`}>
          {getStatusIcon()}
          <span className="text-sm font-medium">{getStatusText()}</span>
        </div>
        
        {/* Last Checked Time */}
        {lastChecked && (
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {lastChecked.toLocaleTimeString()}
          </span>
        )}
      </div>

      {/* Reconnect Button - Only show when disconnected */}
      {!isConnected && !isChecking && (
        <button
          onClick={handleReconnect}
          disabled={isChecking}
          className="flex items-center space-x-2 px-3 py-1.5 bg-red-500 hover:bg-red-600 disabled:bg-red-400 text-white text-sm font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
        >
          <Wifi className="w-4 h-4" />
          <span>Reconnect</span>
        </button>
      )}

      {/* Manual Check Button - Always show */}
      <button
        onClick={handleReconnect}
        disabled={isChecking}
        className="flex items-center space-x-2 px-2 py-1.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg transition-colors duration-200"
      >
        <RefreshCw className={`w-4 h-4 ${isChecking ? 'animate-spin' : ''}`} />
        <span>Check</span>
      </button>

      {/* Error Tooltip */}
      {error && !isConnected && (
        <div className="relative group">
          <div className="absolute bottom-full right-0 mb-2 w-64 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <div className="text-sm text-red-800 dark:text-red-200">
              <strong>Connection Error:</strong>
              <br />
              {error}
            </div>
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-red-200 dark:border-t-red-700"></div>
          </div>
        </div>
      )}
    </div>
  );
}; 