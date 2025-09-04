import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        if (token && storedUser) {
            setUser(JSON.parse(storedUser));
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const res = await axios.post('http://localhost:5001/api/auth/login', {
                email,
                password,
            });
            const { user: userData, token } = res.data;
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            return userData;
        } catch (error) {
            throw error.response?.data || { error: 'An error occurred during login' };
        }
    };

    const register = async (name, email, password) => {
        try {
            const res = await axios.post('http://localhost:5001/api/auth/register', {
                name,
                email,
                password,
            });
            const { user: userData, token } = res.data;
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            return userData;
        } catch (error) {
            throw error.response?.data || { error: 'An error occurred during registration' };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                register,
                logout,
            }}
        >
            {!loading && children}
        </AuthContext.Provider>
    );
};
