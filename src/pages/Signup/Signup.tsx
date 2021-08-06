import React from 'react';
import { useHistory } from 'react-router-dom';
import { IUser } from 'src/models/user';
import { IStatusType } from 'src/models/status';
import { login } from 'src/services/authenticate';
import { createUser } from 'src/services/api';
import useUserContext from 'src/hooks/useUserContext';
import Toaster, { IToaster } from 'src/components/Toaster/Toaster';
import './Signup.css';

export default function Signup() {
  const formData: IUser = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPassword: '',
  }

  const formStatusObject: IToaster = {
    type: undefined,
    message: undefined,
  }

  const [formState, setFormState] = React.useState(formData);
  const [formStatus, setFormStatus] = React.useState(formStatusObject);
  const history = useHistory();
  const { setCurrentUser } = useUserContext();

  const handleFormSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log('event', event, formState);
    const {
      confirmPassword,
      ...otherFormState
    } = formState;

    // TODO: Refactor code
    // have inline error alerts
    // update error on input change
    // First check that password matches
    if (confirmPassword !== otherFormState.password) {
      console.log('Password does not match');
      setFormStatus({
        type: IStatusType.error,
        message: 'Password does not match',
      })
      return;
    }

    const formResponse = await createUser(otherFormState);

    if (formResponse) {
      if (formResponse.status === 200) {
        // TODO: Refactor code
        // Move authentication to a
        // wrapper component that can
        // be reused on other components
        const authenticateResponse = await login(formState);
        if (authenticateResponse && authenticateResponse.status === 200) {
          console.log('authenticateResponse', authenticateResponse);

          setCurrentUser(authenticateResponse.data);

          // TODO: Refactor
          // on success display
          // the success message
          // on a seperate page
          // then redirect to home
          setFormStatus({
            type: IStatusType.success,
            message: 'Successfully created'
          });

          setFormState(formData);

          setTimeout(() => {
            history.push('/');
          }, 400);
        }
      }

      if (formResponse.status >= 400 && formResponse.status < 500) {
        const message = formResponse.data.message ? formResponse.data.message : 'Something went wrong try again';
        setFormStatus({
          type: IStatusType.error,
          message,
        })
      }
    }
  }

  // TODO: refactor this
  // add throttle so input
  // event does not get fired
  // on multiple keypresses
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

  return (
    <section className="App-section App-signup">
      <h2>Signup</h2>
      <form className="App-signup__form">
        {formStatus.type && formStatus.message && 
          <div className="App-form-group">
            <Toaster type={formStatus.type} message={formStatus.message} />
          </div>
        }
        <div className="App-form-group">
          <input className="App-signup__input" type="text" onChange={handleSetInput} id="App-signup__form-first-name" name="firstName" placeholder="Enter your firstname" />
        </div>
        <div className="App-form-group">
          <input className="App-signup__input" type="text" onChange={handleSetInput} id="App-signup__form-last-name" name="lastName" placeholder="Enter your lastname" />
        </div>
        <div className="App-form-group">
          <input className="App-signup__input" type="text" onChange={handleSetInput} id="App-signup__form-username" name="username" placeholder="Enter your username" />
        </div>
        <div className="App-form-group">
          <input className="App-signup__input" type="password" onChange={handleSetInput} id="App-signup__form-password" name="password" placeholder="Enter your password" />
        </div>
        <div className="App-form-group">
          <input className="App-signup__input" type="password" onChange={handleSetInput} id="App-signup__form-confirm-password" name="confirmPassword" placeholder="Confirm your password" />
        </div>
        <div className="App-form-group">
          <button className="App-btn App-btn--primary App-btn__signup" onClick={handleFormSubmit}>Signup</button>
        </div>
      </form>
    </section>
  )
}
