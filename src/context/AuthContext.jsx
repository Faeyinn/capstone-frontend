import React, { createContext, useState, useContext } from 'react';
import { Children } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);

    const login = (role) => {
        setIsAuthenticated(true);
        setUserRole(role);
        console.log(`User logged in as: ${role}`);
    }

    const logout = () => {
        setIsAuthenticated(false);
        setUserRole(null);
        console.log('user logged out');
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
        return useContext(AuthContext);
}