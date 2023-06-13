import React from 'react';
import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import LoginForm from './components/LoginForm';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <LoginForm />
      </div>

    </AuthProvider>
  );
}

export default App;
