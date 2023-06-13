import React, { useContext } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AuthContext, AuthProvider } from './contexts/AuthContext';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoutes';
import { LoginContextType } from './Interfaces/Interfaces';

function App() {
  const {user, isLoggedIn, logout} = useContext(AuthContext) as LoginContextType;
  return (
    <>
      <div className='bg-gradient-to-r flex flex-col from-pink-500 to-blue-500 h-screen'>
        <div>
          { isLoggedIn ?
            <div className='flex flex-row m-5'>
              <div className='m-2 bg-white p-2 px-6 font-bold rounded-lg drop-shadow-lg'>User: {user?.name}</div>
              <h1 className='flex pr-20 grow justify-center text-5xl text-white drop-shadow-lg font-bold'>To Do App</h1>
              <div className='m-2 bg-white p-2 px-6 font-bold rounded-lg drop-shadow-lg cursor-pointer' onClick={()=>logout()}>logout</div>
            </div> :
            <div className='flex flex-row m-5'>
              <h1 className='flex grow justify-center text-5xl text-white drop-shadow-lg font-bold'>To Do App</h1>
            </div>
          }

        </div>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="dashboard" element={<ProtectedRoute component={Dashboard} />} />
          {/* <ProtectedRoute path="dashboard" element={<Dashboard />} /> */}
        </Routes>
      </div>
    </>
  );
}

export default App;
