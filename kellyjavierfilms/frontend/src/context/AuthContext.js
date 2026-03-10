import React, { createContext, useState, useCallback, useEffect } from 'react';
import { authAPI } from '../api/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize from localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const register = useCallback(async (firstName, lastName, email, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authAPI.register({
        firstName,
        lastName,
        email,
        password
      });

      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setToken(token);
      setUser(user);

      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authAPI.login({ email, password });
      console.log('Login response:', response.data);

      const { token, user } = response.data;
      console.log('Setting token:', token);
      console.log('Setting user:', user);
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setToken(token);
      setUser(user);

      console.log('Token and user saved to state');
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      console.error('Login error:', errorMessage);
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const forgotPassword = useCallback(async (email) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authAPI.forgotPassword(email);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to send password reset email';
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const resetPassword = useCallback(async (resetToken, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authAPI.resetPassword(resetToken, password);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to reset password';
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const verifyEmail = useCallback(async (token) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authAPI.verifyEmail(token);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to verify email';
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      await authAPI.logout();
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setToken(null);
      setUser(null);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Logout failed';
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    user,
    setUser,
    token,
    loading,
    error,
    register,
    login,
    forgotPassword,
    resetPassword,
    verifyEmail,
    logout,
    isAuthenticated: !!token
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
