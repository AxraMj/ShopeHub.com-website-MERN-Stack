import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check if user is logged in on initial load
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            const parsedUserInfo = JSON.parse(userInfo);
            setUser(parsedUserInfo);
            setIsAuthenticated(true);
        }
    }, []);

    const login = (userData) => {
        // Store both user info and token
        const userInfo = {
            _id: userData._id,
            name: userData.name,
            email: userData.email,
            isAdmin: userData.isAdmin,
            token: userData.token
        };
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        setUser(userInfo);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('userInfo');
        setUser(null);
        setIsAuthenticated(false);
    };

    const updateUserInfo = (updatedUserData) => {
        // Update user info while preserving the token
        const updatedUserInfo = {
            ...user,
            name: updatedUserData.name,
            email: updatedUserData.email,
            isAdmin: updatedUserData.isAdmin
        };
        localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
        setUser(updatedUserInfo);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, updateUserInfo }}>
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