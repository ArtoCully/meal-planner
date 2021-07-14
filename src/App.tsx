import React from 'react';
import {
  BrowserRouter,
  NavLink,
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
                <NavLink to="/menu/weekly" activeClassName="active">Weekly Menu</NavLink>
              </li>
              <li>
                <NavLink to="/recipes/add" activeClassName="active">Add Receipe</NavLink>
              </li>
            </ul>
        </nav>

        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
