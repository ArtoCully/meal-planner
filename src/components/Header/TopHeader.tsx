import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { logout } from 'src/services/authenticate';
import useUserContext from 'src/hooks/useUserContext';
import logo from 'src/logo.svg';
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
      <Link to="/" className="App-logo" ><img src={logo} alt="logo" /></Link>
      {currentUser && <span>{currentUser.username}</span>}
      {currentUser && <button className="App-logout" onClick={handleLogout}>Logout</button>}
    </header>
  )
}
