import React from 'react';
import { useHistory } from 'react-router-dom';
import { logout } from '../../services/authenticate';
import useUserContext from '../../hooks/useUserContext';
import logo from '../../logo.svg';
import './TopHeader.css';

export default function TopHeader() {
  const { currentUser, setCurrentUser } = useUserContext();

  const history = useHistory();
  // TODO: currentUser prop should
  // be on the global state decide
  // how to do this then implement
  // could be redux/rxjs/contextprovider
  console.log('currentUser Context userContext', currentUser);

  const handleLogout = async () => {
    const cleared = await logout();
    if (cleared) {
      setCurrentUser(null);
      history.push('/login');
    }
  }

  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      {currentUser && <span>{currentUser.username}</span>}
      {currentUser && <button className="App-logout" onClick={handleLogout}>Logout</button>}
    </header>
  )
}