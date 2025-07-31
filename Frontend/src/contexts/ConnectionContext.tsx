import React, { createContext, useContext, ReactNode } from 'react';
import { useConnectionStatus, ConnectionStatus } from '../hooks/useConnectionStatus';

interface ConnectionContextType extends ConnectionStatus {
  checkConnection: () => Promise<void>;
  reconnect: () => Promise<void>;
}

const ConnectionContext = createContext<ConnectionContextType | undefined>(undefined);

interface ConnectionProviderProps {
  children: ReactNode;
}

export const ConnectionProvider: React.FC<ConnectionProviderProps> = ({ children }) => {
  const connectionStatus = useConnectionStatus();

  return (
    <ConnectionContext.Provider value={connectionStatus}>
      {children}
    </ConnectionContext.Provider>
  );
};

export const useConnection = (): ConnectionContextType => {
  const context = useContext(ConnectionContext);
  if (context === undefined) {
    throw new Error('useConnection must be used within a ConnectionProvider');
  }
  return context;
}; 