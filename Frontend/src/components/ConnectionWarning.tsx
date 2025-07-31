import React from 'react';
import { AlertTriangle, Wifi } from 'lucide-react';
import { useConnection } from '../contexts/ConnectionContext';

interface ConnectionWarningProps {
  children?: React.ReactNode;
  className?: string;
}

export const ConnectionWarning: React.FC<ConnectionWarningProps> = ({ 
  children, 
  className = "" 
}) => {
  const { isConnected, isChecking, reconnect } = useConnection();

  if (isConnected || isChecking) {
    return <>{children}</>;
  }

  return (
    <div className={`bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg p-4 ${className}`}>
      <div className="flex items-start space-x-3">
        <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
                     <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-1">
             Server Connection Required
           </h3>
           <p className="text-sm text-amber-700 dark:text-amber-300 mb-3">
             This feature requires a connection to the server. Please check your connection and try again.
           </p>
          <button
            onClick={reconnect}
            disabled={isChecking}
            className="flex items-center space-x-2 px-3 py-2 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-400 text-white text-sm font-medium rounded-lg transition-colors duration-200"
          >
            <Wifi className="w-4 h-4" />
            <span>{isChecking ? 'Connecting...' : 'Reconnect'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}; 