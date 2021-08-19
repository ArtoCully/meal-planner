import React from 'react';
import { TopHeader } from './components/Header';
import Routes from './Routes';
import AuthContextProvider from './context/AuthContext';
import { fetchCurrentUser } from 'src/services/api';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = React.useState([]);

  React.useEffect(() => {
    const getCurrentUser = async () => {
      const user = await fetchCurrentUser();
      setCurrentUser(user);
    }

    getCurrentUser();
  }, [currentUser]);

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
