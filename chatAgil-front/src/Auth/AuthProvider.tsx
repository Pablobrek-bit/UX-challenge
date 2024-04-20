import { AuthContext } from './AuthContext';
import { useContext, useEffect, useState } from 'react';
import { User } from '../types/User';
import { api } from '../lib/axios';

export function AuthProvider({ children }: { children: JSX.Element }) {
  const [data, setData] = useState<{ user: User; token: string } | null>(null);

  async function signin(email: string, password: string) {
    try {
      const response = await api.post('/auth', { email, password });

      if (response.status === 200) {
        const { user, token } = response.data;
        setData({ user, token });

        localStorage.setItem('@chatAgil:token', token);
        localStorage.setItem('@chatAgil:user', JSON.stringify(user));

        api.defaults.headers['Authorization'] = `Bearer ${token}`;

        return { user, token };
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }

  function singout() {
    setData(null);
    localStorage.removeItem('@chatAgil:token');
    localStorage.removeItem('@chatAgil:user');
    delete api.defaults.headers['Authorization'];

    return null;
  }

  useEffect(() => {
    const token = localStorage.getItem('@chatAgil:token');
    const user = localStorage.getItem('@chatAgil:user');

    if (token && user) {
      setData({ user: JSON.parse(user), token });
      api.defaults.headers['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user: data?.user || null, signin, singout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
