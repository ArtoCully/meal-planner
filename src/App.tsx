import React from 'react';
import { TopHeader } from './components/Header';
import Routes from './Routes';
import { getCurrentUser } from './services/authenticate';
import AuthContextProvider from './context/AuthContext';
import './App.css';

function App() {
  const currentUser = getCurrentUser();

  return (
    <AuthContextProvider currentUser={currentUser}>
      <div className="App">
        <TopHeader />
        <Routes />
      </div>
    </AuthContextProvider>
  );
}

export default App;
