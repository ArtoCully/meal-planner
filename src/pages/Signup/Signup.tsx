import React from 'react';
import { Link } from 'react-router-dom';
import {
  Pane,
  Button
} from 'evergreen-ui';
import { FormGroup, TextInput } from 'src/components/Form';
import { IUser } from 'src/models/user';
import { IStatusType } from 'src/models/status';
import useProvideAuth from 'src/hooks/useProvideAuth';
import useAuth from 'src/hooks/useAuth';
import { useRouter } from 'src/hooks/useRouter';
import { Toaster } from 'src/components/Toaster';
import { IToaster } from 'src/components/Toaster/models';
import { DividerWithText } from 'src/components/Divider';

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
  const router = useRouter();
  const auth = useProvideAuth();
  const { setCurrentUser } = useAuth();

  const handleFormSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const {
      confirmPassword,
      ...otherFormState
    } = formState;

    // TODO: Refactor code
    // have inline error alerts
    // update error on input change
    // First check that password matches
    if (confirmPassword !== otherFormState.password) {
      setFormStatus({
        type: IStatusType.error,
        message: 'Password does not match',
      })
      return;
    }

    const authenticateResponse = await auth.signup(otherFormState, formState);

    if (authenticateResponse) {
      if (authenticateResponse.status === 200) {
        setFormStatus({
          type: IStatusType.success,
          message: 'Successfully created'
        });

        setCurrentUser(authenticateResponse.data);
        setFormState(formData);
        setTimeout(() => {
          const pathname = router.location &&
          router.location.state &&
          router.location.state.from &&
          router.location.state.from.pathname;
  
          if (pathname) {
            router.push(pathname);
          } else {
            router.push('/');
          }
        }, 100);
      }
      if (authenticateResponse.status >= 400) {
        const message = authenticateResponse.data.message
          ? authenticateResponse.data.message
          : 'Internal error, try again';

        setFormStatus({
          type: IStatusType.error,
          message,
        });
      }
    } else {
      setFormStatus({
        type: IStatusType.error,
        message: 'Internal error, try again',
      });
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
    <Pane
      is="section"
      className="App-section App-signup"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <h2>Signup</h2>
      <Pane
        is="form"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        width="80vw"
      >
        {formStatus.type && formStatus.message && 
          <div className="App-form-group">
            <Toaster type={formStatus.type} message={formStatus.message} />
          </div>
        }
        <FormGroup>
          <TextInput
            type="text"
            onChange={handleSetInput}
            id="App-signup__form-first-name"
            name="firstName"
            placeholder="Enter your firstname"
          />
        </FormGroup>
        <FormGroup>
          <TextInput
            type="text"
            onChange={handleSetInput}
            id="App-signup__form-last-name"
            name="lastName"
            placeholder="Enter your lastname"
          />
        </FormGroup>
        <FormGroup>
          <TextInput
            type="text"
            onChange={handleSetInput}
            id="App-signup__form-username"
            name="username"
            placeholder="Enter your username"
          />
        </FormGroup>
        <FormGroup>
          <TextInput
            type="password"
            onChange={handleSetInput}
            id="App-signup__form-password"
            name="password"
            placeholder="Enter your password"
          />
        </FormGroup>
        <FormGroup>
          <TextInput
            type="password"
            onChange={handleSetInput}
            id="App-signup__form-confirm-password"
            name="confirmPassword"
            placeholder="Confirm your password" 
          />
        </FormGroup>
        <FormGroup
          className="App-form-group"
          marginBottom="0"
        >
          <Button
            width="100%"
            appearance="primary"
            intent="none"
            size="large"
            onClick={handleFormSubmit}>
              Signup
          </Button>
        </FormGroup>
      </Pane>

      <DividerWithText text="OR" lineColour="#333" textColour="#333" />

      <Pane
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        marginBottom="20px"
        width="100%"
      >
        <Link to="/login">Login</Link>
      </Pane>
    </Pane>
  )
}
