import React, { createContext, useState } from 'react';
import { LoginContextType, IuserData } from '../Interfaces/Interfaces'

export const AuthContext = createContext<LoginContextType | null>(null)

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<IuserData | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (userData: IuserData) => {
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('authToken')
    setIsLoggedIn(false)
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, setIsLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
