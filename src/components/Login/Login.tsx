import React from 'react';
import { Link } from 'react-router-dom';
import DividerWithText from '../Divider/DividerWithText';
import './Login.css';

export default function Login() {

  return (
    <section className="App-section App-login">
      <h2>Login</h2>
      <form className="App-login__form">
        <div className="App-form-group">
          <input type="text" id="App-login__form-username" name="username" placeholder="Enter your username" />
        </div>
        <div className="App-form-group">
          <input type="password" id="App-login__form-password" name="password" placeholder="Enter your password" />
        </div>
        <div className="App-form-group">
          <button className="App-btn App-btn--primary App-btn__login">Login</button>
        </div>
        <DividerWithText text="OR" lineColour="#333" textColour="#333" />
        <div className="App-form-group">
          <button className="App-btn App-btn--secondary App-btn__signup">Signup</button>
        </div>
        <div className="App-form-group">
          <Link to="/">Continue as guest</Link>
        </div>
      </form>
    </section>
  )
}
