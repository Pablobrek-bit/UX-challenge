import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

// Componente Autenticado
export const Authenticated = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem('@chatAgil:token');

  if (token) {
    return children;
  }

  return <Navigate to="/login" replace />;
};
