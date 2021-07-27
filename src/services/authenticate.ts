import Cookie from 'js-cookie';

export const getCurrentUser = () => {
  const user = Cookie.get('app_user') as string;

  if (user) {
    const userObject = JSON.parse(user);
    return userObject;
  }

  return false;
}

export const logout = () => {
  Cookie.remove('app_user');
  Cookie.remove('app_tok');
  const app_user = Cookie.get('app_user');
  const app_tok = Cookie.get('app_tok');

  if (!app_user && !app_tok) {
    return true;
  }

  return false;
}
