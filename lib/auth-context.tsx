'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'super-admin' | 'company-admin' | 'employee';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  company?: string;
  department?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Simulate loading from session/localStorage
  useEffect(() => {
    const savedUser = typeof window !== 'undefined' 
      ? localStorage.getItem('ems-user') 
      : null;
    
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('ems-user');
    }
  };

  const updateUser = (newUser: User | null) => {
    setUser(newUser);
    if (newUser && typeof window !== 'undefined') {
      localStorage.setItem('ems-user', JSON.stringify(newUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, setUser: updateUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
