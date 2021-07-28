import React from 'react';
import { useHistory } from 'react-router-dom';
import { getCurrentUser, logout } from '../../services/authenticate';
import logo from '../../logo.svg';
import './TopHeader.css';

export default function TopHeader() {
  const history = useHistory();
  // TODO: currentUser prop should
  // be on the global state decide
  // how to do this then implement
  // could be redux/rxjs/contextprovider
  const currentUser = getCurrentUser();
  console.log('currentUser', currentUser);

  const handleLogout = async () => {
    const cleared = await logout();
    if (cleared) {
      history.push('/login');
    }
  }

  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      {currentUser && <button className="App-logout" onClick={handleLogout}>Logout</button>}
    </header>
  )
}
