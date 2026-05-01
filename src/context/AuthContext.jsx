import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUserData = localStorage.getItem('userData');
        if (token && storedUserData) {
            const userData = JSON.parse(storedUserData);
            setIsAuthenticated(true);
            setUser(userData);
        } else {
            setIsAuthenticated(false);
            setUser(null);
        }
    }, []);

    const login = (userData, token) => {
        setIsAuthenticated(true);
        setUser(userData);
        localStorage.setItem('token', token);
        localStorage.setItem('userData', JSON.stringify(userData));
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);