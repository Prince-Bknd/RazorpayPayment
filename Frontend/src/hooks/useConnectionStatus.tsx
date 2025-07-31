import { useState, useEffect, useCallback } from 'react';
import { healthCheck } from '../utils/api';

export interface ConnectionStatus {
  isConnected: boolean;
  isChecking: boolean;
  lastChecked: Date | null;
  error: string | null;
}

export const useConnectionStatus = () => {
  const [status, setStatus] = useState<ConnectionStatus>({
    isConnected: false,
    isChecking: false,
    lastChecked: null,
    error: null,
  });

  const checkConnection = useCallback(async () => {
    setStatus(prev => ({ ...prev, isChecking: true, error: null }));
    
    try {
      await healthCheck();
      setStatus({
        isConnected: true,
        isChecking: false,
        lastChecked: new Date(),
        error: null,
      });
    } catch (error: any) {
             setStatus({
         isConnected: false,
         isChecking: false,
         lastChecked: new Date(),
         error: 'Connection failed',
       });
    }
  }, []);

  const reconnect = useCallback(async () => {
    await checkConnection();
  }, [checkConnection]);

  // No automatic health checks - only when explicitly requested

  return {
    ...status,
    checkConnection,
    reconnect,
  };
}; 