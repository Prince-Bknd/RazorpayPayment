import React from 'react';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './components/ThemeProvider';
import { RouterProvider, useRouter } from './hooks/useRouter';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Products } from './pages/Products';
import { Payments } from './pages/Payments';
import { Configuration } from './pages/Configuration';
import { Analytics } from './pages/Analytics';
import { Help } from './pages/Help';

const AppContent: React.FC = () => {
  const { currentPath } = useRouter();

  const renderPage = () => {
    switch (currentPath) {
      case '/':
        return <Dashboard />;
      case '/products':
        return <Products />;
      case '/payments':
        return <Payments />;
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
      {renderPage()}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'var(--toast-bg)',
            color: 'var(--toast-color)',
          },
        }}
      />
    </Layout>
  );
};

function App() {
  return (
    <ThemeProvider>
      <RouterProvider>
        <AppContent />
      </RouterProvider>
    </ThemeProvider>
  );
}

export default App;