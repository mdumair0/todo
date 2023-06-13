import React, { createContext, useState } from 'react';
import { LoginContextType, IuserData, IMainTodo } from '../Interfaces/Interfaces'
import { isUndefined } from 'util';

export const AuthContext = createContext<LoginContextType | null>(null)

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<IuserData | null>(null);
  const [tasks, setTasks] = useState<IMainTodo[] | null>(JSON.parse(localStorage.getItem('authToken')!)?.Todos || null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!(localStorage.getItem('authToken')));

  const login = (userData: IuserData) => {
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('authToken')
    setIsLoggedIn(false)
    setUser(null);
  };

  const value = { user, isLoggedIn, tasks, setTasks, setIsLoggedIn, login, logout }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
