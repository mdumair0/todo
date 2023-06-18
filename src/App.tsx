import React, { useContext } from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import { AuthContext } from './contexts/AuthContext';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoutes';
import { LoginContextType } from './Interfaces/Interfaces';

function App() {
  const {user, isLoggedIn, logout} = useContext(AuthContext) as LoginContextType;
  return (
    <>
      <div className='bg-gradient-to-l flex flex-col from-blue-300 to-blue-900 h-screen'>
        <div>
          <div className='flex flex-row m-5'>
            <h1 className='flex w-60 mt-20 md:mt-10 md:w-0 md:pr-20 grow justify-center text-3xl md:text-5xl text-white drop-shadow-lg font-bold'>To Do App</h1>
          </div>
          { isLoggedIn ?
            <div className="flex mx-5 md:mx-32 lg:32 justify-between">
              <div className="flex m-2 bg-white pt-2 px-4 md:px-6 font-bold rounded-lg drop-shadow-lg">User: {user?.name}</div>
              <div className="flex m-2 bg-white pt-2 px-4 md:px-6 h-10 font-bold rounded-lg drop-shadow-lg cursor-pointer ml-auto" onClick={() => logout()}>logout</div>
            </div> : '' }
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
