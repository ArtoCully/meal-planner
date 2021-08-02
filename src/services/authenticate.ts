import Cookies from 'js-cookie';
import { authenticate } from './api';
import { ILogin } from '../models/user';

export const getCurrentUser = () => {
  const user = Cookies.get('app_user') as string;

  if (user) {
    const userObject = JSON.parse(user);
    return userObject;
  }

  return false;
}

export const login = async ({ username, password }: ILogin) => {
  try {
    const authenticateResponse = await authenticate({
      username,
      password,
    }).catch((err) => { throw err });

    if (authenticateResponse && authenticateResponse.status === 200) {
      const { token, ...currentUser } = authenticateResponse.data;
      await Cookies.set('app_tok', token, { expires: 7 })
      await Cookies.set('app_user', JSON.stringify(currentUser), { expires: 7 })

      // TODO: create a global state (using redux)
      // which dispatches or updates the setCurrentUser
      // setCurrentUser(currentUser);

      return authenticateResponse;
    }
  } catch (e) {
    console.log('Login error', e);
    return e.response;
  }
}

export const logout = () => {
  Cookies.remove('app_user');
  Cookies.remove('app_tok');
  const app_user = Cookies.get('app_user');
  const app_tok = Cookies.get('app_tok');

  // TODO: create a global state (using redux)
  // which dispatches or updates the setCurrentUser
  // setCurrentUser(null);

  if (!app_user && !app_tok) {
    return true;
  }

  return false;
}