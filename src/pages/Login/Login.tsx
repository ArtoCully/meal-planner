import React from 'react';
import styled from 'styled-components';
import {
  Button,
  Pane,
  Heading,
  majorScale
} from 'evergreen-ui';
import { FormGroup, TextInput } from 'src/components/Form';
import { Link } from 'react-router-dom';
import { DividerWithText } from 'src/components/Divider';
import useProvideAuth from 'src/hooks/useProvideAuth';
import useAuth from 'src/hooks/useAuth';
import { useRouter } from 'src/hooks/useRouter';
import { ILogin } from 'src/models/user';

const CustomFormGroup = styled(FormGroup)`
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const CustomFormGroupBottom = styled(CustomFormGroup)`
  margin-bottom: 0;
`;

export default function Login() {
  const { login } = useProvideAuth();
  const { setCurrentUser } = useAuth();
  const router = useRouter();

  const formObject: ILogin = {
    username: '',
    password: '',
  }

  const [formState, setFormState] = React.useState(formObject);

  React.useEffect(() => {

  },);

  const handleSetInput = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    const form = {
      ...formState,
      [name]: value,
    }
    setFormState(form);
  }, [formState]);

  const handleLogin = React.useCallback(async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const response = await login(formState);
    if (response && response.status === 200) {
      const pathname = router.location &&
        router.location.state &&
        router.location.state.from &&
        router.location.state.from.pathname;

      setCurrentUser(response.data);

      if (pathname) {
        router.push(pathname);
      } else {
        router.push('/');
      }
    }
  }, [
    formState,
    login,
    router,
    setCurrentUser,
  ]);

  return (
    <Pane
      is="section"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      className="App-section App-login"
    >
      <Heading
        size={700}
        marginBottom={majorScale(2)}
        marginTop={majorScale(1)}
      >
        Login
      </Heading>

      <Pane
        is="form"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        width="80vw"
      >
        <CustomFormGroup>
          <TextInput
            type="text"
            onChange={handleSetInput}
            id="App-login__form-username"
            name="username"
            placeholder="Enter your username"
          />
        </CustomFormGroup>
        <CustomFormGroup>
          <TextInput
            type="password"
            onChange={handleSetInput}
            id="App-login__form-password"
            name="password"
            placeholder="Enter your password"
          />
        </CustomFormGroup>
        <CustomFormGroupBottom>
          <Button
            width="100%"
            appearance="primary"
            intent="none"
            size="large"
            onClick={handleLogin}>
              Login
          </Button>
        </CustomFormGroupBottom>
        <DividerWithText text="OR" lineColour="#333" textColour="#333" />
        <CustomFormGroup>
          <Button
            is={Link}
            width="100%"
            intent="none"
            size="large"
            to="/signup">
            Signup
          </Button>
        </CustomFormGroup>
        <CustomFormGroup>
          <Link to="/recipes/list">Continue as guest</Link>
        </CustomFormGroup>
      </Pane>
    </Pane>
  )
}
