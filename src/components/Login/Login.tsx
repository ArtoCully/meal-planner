import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { login } from 'src/services/authenticate';
import DividerWithText from 'src/components/Divider/DividerWithText';
import useUserContext from 'src/hooks/useUserContext';
import { ILogin } from 'src/models/user';
import { LocationState } from 'src/models/history';
import './Login.css';

export default function Login() {
  const { setCurrentUser } = useUserContext();
  const history = useHistory();
  const location: LocationState  = useLocation();
  const formObject: ILogin = {
    username: '',
    password: '',
  }

  const [formState, setFormState] = React.useState(formObject);

  React.useEffect(() => {
    console.log('history', history);
    console.log('location', location);
  },);

  const handleSetInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    const form = {
      ...formState,
      [name]: value,
    }
    setFormState(form);
  }

  const handleLogin = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const response = await login(formState);
    if (response && response.status === 200) {
      console.log('response', response);
      const pathname = location &&
        location.state &&
        location.state.from &&
        location.state.from.pathname;

      setCurrentUser(response.data);

      console.log('pathname', pathname);

      if (pathname) {
        history.push(pathname);
      } else {
        history.push('/');
      }
    }
  };

  return (
    <section className="App-section App-login">
      <h2>Login</h2>
      <form className="App-login__form">
        <div className="App-form-group">
          <input type="text" onChange={handleSetInput} id="App-login__form-username" name="username" placeholder="Enter your username" />
        </div>
        <div className="App-form-group">
          <input type="password" onChange={handleSetInput} id="App-login__form-password" name="password" placeholder="Enter your password" />
        </div>
        <div className="App-form-group">
          <button className="App-btn App-btn--primary App-btn__login" onClick={handleLogin}>Login</button>
        </div>
        <DividerWithText text="OR" lineColour="#333" textColour="#333" />
        <div className="App-form-group">
          <Link to="/signup" className="App-btn App-btn--secondary App-btn__signup">Signup</Link>
        </div>
        <div className="App-form-group">
          <Link to="/">Continue as guest</Link>
        </div>
      </form>
    </section>
  )
}
