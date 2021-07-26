import React from 'react';
import { NavLink } from 'react-router-dom';
import './FixedNav.css';

export default function FixedNav() {
  return (
    <nav className="App-fixed-nav">
      <ul>
        <li>
          <NavLink to="/menu/weekly" activeClassName="active">Weekly Menu</NavLink>
        </li>
        <li>
          <NavLink to="/recipes/add" activeClassName="active">Add Receipe</NavLink>
        </li>
        <li>
          <NavLink to="/recipes/list" activeClassName="active">Receipes</NavLink>
        </li>
      </ul>
    </nav>
  )
}
