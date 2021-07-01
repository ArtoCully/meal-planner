import React from 'react';
import {
  BrowserRouter,
  Link,
} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Routes from './Routes';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      <BrowserRouter>
        <nav className="App-top-nav">
            <ul>
              <li>
                <Link to="/">Weekly Menu</Link>
              </li>
              <li>
                <Link to="/add-receipe">Add Receipe</Link>
              </li>
            </ul>
        </nav>

        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
