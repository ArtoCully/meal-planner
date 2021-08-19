import React from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'src/hooks/useRouter';
import { createUser, authenticate } from 'src/services/api';
import { IUser, ILogin } from 'src/models/user';

function useProvideAuth() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = React.useState(null);

  const login = async ({ username, password }: ILogin) => {
    try {
      const authenticateResponse = await authenticate({
        username,
        password,
      }).catch((err) => { throw err });

      if (authenticateResponse && authenticateResponse.status === 200) {
        const { token, ...currentUser } = authenticateResponse.data;
        await Cookies.set('app_tok', token, { expires: 7 })
        await Cookies.set('app_user', JSON.stringify(currentUser), { expires: 7 })

        return authenticateResponse;
      }
    } catch (e) {
      console.log('Error login', e);
      return e.response;
    }
  };

  const signup = async (signupParams: IUser, loginParams: ILogin) => {
    let formResponse;
    let authenticateResponse;

    try {
      formResponse = await createUser(signupParams);

      if (formResponse.status === 200) {
        authenticateResponse = await login(loginParams);
      }
    } catch (err) {
      console.log('Error signinup', err);
    }

    return authenticateResponse || formResponse;
  };

  const logout = () => {
    Cookies.remove('app_user');
    Cookies.remove('app_tok');
    const app_user = Cookies.get('app_user');
    const app_tok = Cookies.get('app_tok');

    if (!app_user && !app_tok) {
      setCurrentUser(null);
      router.push('/login');
      return true;
    }

    return false;
  };

  const sendPasswordResetEmail = (email: string) => {
    // TODO: add functionality
    console.log('email', email);
  };

  const confirmPasswordReset = (code:string, password:string) => {
    // TODO: add functionality
    console.log('code', code, 'password', password);
  };

  return {
    currentUser,
    setCurrentUser,
    login,
    signup,
    logout,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
}

export default useProvideAuth;
