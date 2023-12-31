import React, { createContext, useState } from 'react';
import { LoginContextType, IuserData, IMainTodo, ICreateBox } from '../Interfaces/Interfaces'

export const AuthContext = createContext<LoginContextType | null>(null)

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<IuserData | null>(JSON.parse(localStorage.getItem('authToken')!) || null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!(localStorage.getItem('authToken')));
  const [tasks, setTasks] = useState<IMainTodo[] | null>(JSON.parse(localStorage.getItem('authToken')!)?.Todos || null); 
  const [editForm, setEditForm] = useState<ICreateBox | null>(null)

  const login = (userData: IuserData) => {
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('authToken')
    setIsLoggedIn(false)
    setUser(null);
  };

  const addTask = (task:IMainTodo) => {
    setTasks([...tasks!, task])
  }

  const editTask = (task:IMainTodo) => {
    const editedTask = tasks?.map(ele => {
      if (ele.id === task.id) {
        return task
      }
      return ele
    })
    setTasks(editedTask!)
  }

  const deleteTask = (id:any) => {
    const newTasks = tasks?.filter(ele => ele.id !== id)
    setTasks(newTasks!)
  }

  const value = { user, isLoggedIn, tasks, editForm, editTask, setEditForm, addTask, deleteTask, setTasks, setIsLoggedIn, login, logout }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
