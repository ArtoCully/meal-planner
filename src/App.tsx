import React from 'react';
import logo from './logo.svg';
import './App.css';
import Routes from './Routes';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      <Routes />
    </div>
  );
}

export default App;
