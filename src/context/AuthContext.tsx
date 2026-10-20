import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { apiService } from '../services/api';

interface AuthResult {
  success: boolean;
  error?: string;
  message?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<AuthResult>;
  register: (data: { name: string; email: string; password: string; role?: string; company?: string; department?: string }) => Promise<AuthResult>;
  logout: () => void;
  loginWithToken: (token: string) => Promise<AuthResult>;
  setUserRole: (role: 'manager' | 'employee') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('wpi_token'));
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('wpi_token');

      if (storedToken) {
        try {
          // Verify with backend
          const currentUser = await apiService.getMe();
          if (currentUser) {
            setUser(currentUser);
            setToken(storedToken);
            localStorage.setItem('wpi_user', JSON.stringify(currentUser));
          } else {
            // Token invalid or expired
            localStorage.removeItem('wpi_token');
            localStorage.removeItem('wpi_user');
            setUser(null);
            setToken(null);
          }
        } catch {
          localStorage.removeItem('wpi_token');
          localStorage.removeItem('wpi_user');
          setUser(null);
          setToken(null);
        }
      } else {
        // Unauthenticated visitor
        setUser(null);
        setToken(null);
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string): Promise<AuthResult> => {
    try {
      const res = await apiService.login(email, password);
      if (res && res.token && res.user) {
        setToken(res.token);
        setUser(res.user);
        localStorage.setItem('wpi_token', res.token);
        localStorage.setItem('wpi_user', JSON.stringify(res.user));
        return { success: true };
      }
      return { success: false, error: 'Authentication failed. Please verify your credentials.' };
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || err.message || 'Invalid email or password.';
      return { success: false, error: errorMsg };
    }
  };

  const register = async (data: { name: string; email: string; password: string; role?: string; company?: string; department?: string }): Promise<AuthResult> => {
    try {
      const res = await apiService.register(data);
      if (res && res.success) {
        return { 
          success: true, 
          message: res.message || 'Account created successfully! Please log in with your credentials.' 
        };
      }
      return { success: false, error: 'Registration could not be completed.' };
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || err.message || 'Registration failed. Please check your details.';
      return { success: false, error: errorMsg };
    }
  };

  const loginWithToken = async (token: string) => {
    try {
      // Store token and fetch user profile
      localStorage.setItem('wpi_token', token);
      const user = await apiService.getMe();
      if (user) {
        setUser(user);
        setToken(token);
        localStorage.setItem('wpi_user', JSON.stringify(user));
        return { success: true } as AuthResult;
      }
      // If getMe fails, clear token
      localStorage.removeItem('wpi_token');
      return { success: false, error: 'Invalid token' } as AuthResult;
    } catch (err: any) {
      localStorage.removeItem('wpi_token');
      return { success: false, error: err.message || 'Login failed' } as AuthResult;
    }
  };

  const setUserRole = (role: 'manager' | 'employee') => {
    if (user) {
      const updated = { ...user, role };
      setUser(updated);
      localStorage.setItem('wpi_user', JSON.stringify(updated));
    }
  };

  // Logout clears auth data from local storage and context
  const logout = () => {
    localStorage.removeItem('wpi_token');
    localStorage.removeItem('wpi_user');
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        loginWithToken,
        logout,
        setUserRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
