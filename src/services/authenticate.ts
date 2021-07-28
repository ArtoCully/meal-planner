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

    console.log('authenticateResponse', authenticateResponse);

    if (authenticateResponse && authenticateResponse.status === 200) {
      const { token, ...userData } = authenticateResponse.data;
      await Cookies.set('app_tok', token, { expires: 7 })
      await Cookies.set('app_user', JSON.stringify(userData), { expires: 7 })

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

  if (!app_user && !app_tok) {
    return true;
  }

  return false;
}
