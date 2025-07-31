import React, { useRef } from 'react';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './components/ThemeProvider';
import { ConnectionProvider } from './contexts/ConnectionContext';
import { RouterProvider, useRouter } from './hooks/useRouter';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Payments } from './pages/Payments';
import { Products } from './pages/Products';
import { Configuration } from './pages/Configuration';
import { Analytics } from './pages/Analytics';
import { Help } from './pages/Help';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import './pageTransitions.css';

const AppContent: React.FC = () => {
  const { currentPath } = useRouter();
  const nodeRef = useRef(null);

  const renderPage = () => {
    switch (currentPath) {
      case '/':
        return <Dashboard />;
      case '/payments':
        return <Payments />;
      case '/products':
        return <Products />;
      case '/config':
        return <Configuration />;
      case '/analytics':
        return <Analytics />;
      case '/help':
        return <Help />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout>
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={currentPath}
          classNames="fade-page"
          timeout={300}
          nodeRef={nodeRef}
        >
          <div ref={nodeRef}>{renderPage()}</div>
        </CSSTransition>
      </SwitchTransition>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#ffffff',
            color: '#1f2937',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            padding: '16px 20px',
            fontSize: '14px',
            fontWeight: '500',
            maxWidth: '400px',
          },
          success: {
            style: {
              background: '#f0fdf4',
              color: '#166534',
              border: '1px solid #bbf7d0',
              boxShadow: '0 10px 25px -5px rgba(34, 197, 94, 0.1), 0 10px 10px -5px rgba(34, 197, 94, 0.04)',
            },
            iconTheme: {
              primary: '#22c55e',
              secondary: '#ffffff',
            },
          },
          error: {
            style: {
              background: '#fef2f2',
              color: '#dc2626',
              border: '1px solid #fecaca',
              boxShadow: '0 10px 25px -5px rgba(239, 68, 68, 0.1), 0 10px 10px -5px rgba(239, 68, 68, 0.04)',
            },
            iconTheme: {
              primary: '#ef4444',
              secondary: '#ffffff',
            },
          },
        }}
      />
    </Layout>
  );
};

function App() {
  return (
    <ThemeProvider>
      <ConnectionProvider>
        <RouterProvider>
          <AppContent />
        </RouterProvider>
      </ConnectionProvider>
    </ThemeProvider>
  );
}

export default App;