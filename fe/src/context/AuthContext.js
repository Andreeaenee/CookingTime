// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUserId = localStorage.getItem('userId');
    if (token) {
      setIsAuthenticated(true);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      if (savedUserId) {
        setUserId(savedUserId);
      }
    }
  }, []);

  const login = (token, userId, navigate) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    setIsAuthenticated(true);
    setUserId(userId);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    navigate('/');
  };

  const logout = (navigate) => {
    if (!isAuthenticated) {
      toast.info('First, you need to log in.');
      return;
    }
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setIsAuthenticated(false);
    setUserId(null);
    delete axios.defaults.headers.common['Authorization'];
    navigate('/login');
  };

  const notify = () => {
    toast.info('You need to log in first!');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, notify, userId }}>
      {children}
      <ToastContainer />
    </AuthContext.Provider>
  );
};

export default AuthProvider;