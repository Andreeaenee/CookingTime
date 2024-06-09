import React, { createContext, useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  const login = (token, navigate) => {
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
    setIsAuthenticated(false);
    delete axios.defaults.headers.common['Authorization'];
    navigate('/login');
  };

  const notify = () => {
    toast.info('You need to log in first!');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, notify }}>
      {children}
      <ToastContainer />
    </AuthContext.Provider>
  );
};

export default AuthProvider;
