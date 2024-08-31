import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, username: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('access_token'));
  const [user, setUser] = useState<any>(JSON.parse(localStorage.getItem('user') || '{}'));

  const login = async (email: string, password: string) => {

    localStorage.setItem('access_token', 'your_access_token');
    localStorage.setItem('user', JSON.stringify({ email, username: 'User', avatar: 'avatar_url' }));
    setIsAuthenticated(true);
    setUser(JSON.parse(localStorage.getItem('user') || '{}'));
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser({});
  };

  const register = async (email: string, password: string, username: string) => {

    localStorage.setItem('access_token', 'your_access_token');
    localStorage.setItem('user', JSON.stringify({ email, username, avatar: 'avatar_url' }));
    setIsAuthenticated(true);
    setUser(JSON.parse(localStorage.getItem('user') || '{}'));
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};