import React from 'react';
import { AlertTriangle, X, Wifi } from 'lucide-react';
import { useConnectionStatus } from '../hooks/useConnectionStatus';
import toast from 'react-hot-toast';

export const ConnectionBanner: React.FC = () => {
  const { isConnected, isChecking, error, reconnect } = useConnectionStatus();
  const [isVisible, setIsVisible] = React.useState(true);

  const handleReconnect = async () => {
    try {
      await reconnect();
             if (isConnected) {
         toast.success('Successfully reconnected to server!');
         setIsVisible(false);
       }
         } catch (error) {
       toast.error('Failed to reconnect to server');
     }
  };

  // Don't show banner if connected or checking
  if (isConnected || isChecking || !isVisible) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-red-500 text-white px-4 py-3 shadow-lg">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-3">
          <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                     <div>
             <p className="font-medium">Server Connection Lost</p>
             <p className="text-sm text-red-100">
               Unable to connect to the server. Some features may be unavailable.
             </p>
           </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={handleReconnect}
            disabled={isChecking}
            className="flex items-center space-x-2 px-4 py-2 bg-white text-red-600 hover:bg-red-50 disabled:bg-red-100 disabled:text-red-400 rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
          >
            <Wifi className="w-4 h-4" />
            <span>{isChecking ? 'Connecting...' : 'Reconnect'}</span>
          </button>
          
          <button
            onClick={() => setIsVisible(false)}
            className="p-2 text-red-100 hover:text-white transition-colors duration-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}; 