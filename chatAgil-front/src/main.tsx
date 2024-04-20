import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { Background } from './components/Background';
import { AuthProvider } from './Auth/AuthProvider';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './lib/react-query';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <>
          <Background />
          <RouterProvider router={router} />
        </>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
