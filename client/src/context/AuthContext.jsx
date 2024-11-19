import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../util/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const loadUser = async () => {
        try {
            const response = await api.get('/auth/user');
            setUser(response.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Load user error:', error);
            localStorage.removeItem('token');
            setUser(null);
            setToken(null);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            loadUser();
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            const newToken = response.data.token;
            localStorage.setItem('token', newToken);
            setToken(newToken);
            setIsAuthenticated(true);
            await loadUser();
            return response.data;
        } catch (error) {
            setIsAuthenticated(false);
            throw error.response?.data?.message || 'Login failed';
        }
    };

    const register = async (userData) => {
        try {
            const response = await api.post('/auth/register', userData);
            const newToken = response.data.token;
            localStorage.setItem('token', newToken);
            setToken(newToken);
            setIsAuthenticated(true);
            await loadUser();
            return response.data;
        } catch (error) {
            setIsAuthenticated(false);
            throw error.response?.data?.message || 'Registration failed';
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
        window.location.href = '/login';
    };

    const value = {
        user,
        token,
        loading,
        isAuthenticated,
        isManager: user?.role === 'Manager',
        login,
        register,
        logout,
        loadUser
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
