import React from 'react';
import { TopHeader } from './components/Header';
import Routes from './Routes';
import { getCurrentUser } from './services/authenticate';
import UserContextProvider from './context/UserContext';
import './App.css';

function App() {
  const currentUser = getCurrentUser();

  return (
    <UserContextProvider currentUser={currentUser}>
      <div className="App">
        <TopHeader />
        <Routes />
      </div>
    </UserContextProvider>
  );
}

export default App;
