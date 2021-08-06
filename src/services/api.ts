import axios from 'axios';
import Cookies from 'js-cookie';
import { IRecipe } from '../models/recipe';
import { IUser, ILogin } from '../models/user';

export const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
export const instance = axios.create({
  baseURL,
});

instance.interceptors.request.use(request => {
  console.log(request);
  // Edit request config
  return request;
}, error => {
  console.log(error);
  return Promise.reject(error);
});

instance.interceptors.response.use(response => {
  console.log(response);
  // Edit response config
  return response;
}, error => {
  console.log(error);
  return Promise.reject(error);
});

export async function fetchRecipes() {
  try {
    const data = await instance.get('/recipes');
    return data;
  } catch (e) {
    console.log('fetching recipes errors', e);
  }
};

export async function fetchRecipesByUserId({ userId }: any) {
  const token = Cookies.get('app_tok');
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }

  try {
    const data = await instance.get(`users/${userId}/recipes`, config);
    return data;
  } catch (e) {
    console.log('fetching user recipes errors', e);
  }
};

export async function createRecipe(params: IRecipe) {
  const token = Cookies.get('app_tok');
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }

  console.log('token', token, config);

  try {
    const result = await instance.post('/recipes', params, config)
      .catch((err) => {
        throw err;
      });
    return result;
  } catch (e) {
    console.log('create recipe error', e);
    return e.response
  }
}

export async function deleteRecipe(id?: string) {
  const token = Cookies.get('app_tok');
  const headers = {
    'Authorization': `Bearer ${token}`
  }

  console.log('token', token, headers);
  // const data = { id };

  try {
    const result = await instance.delete(`/recipes/${id}`, { headers })
      .catch((err) => {
        throw err;
      });
    return result;
  } catch (e) {
    console.log('delete recipe error', e);
    return e.response
  }
}

export async function createUser(params: IUser) {
  try {
    const result = await instance.post('/users/register', params)
      .catch((err) => {
        throw err;
      })
    return result;
  } catch (e) {
    console.log('create user error', e);
    return e.response;
  }
}

export async function authenticate(params: ILogin) {
  try {
    const { username, password } = params;
    const paramsToPost = new URLSearchParams()
    paramsToPost.append('username', username);
    paramsToPost.append('password', password)
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    console.log('paramsToPost', paramsToPost);
    const result = await instance.post('/users/authenticate', paramsToPost, config)
      .catch((err) => {
        throw err;
      });
    return result;
  } catch(e) {
    console.log('authenticate user error', e);
    return e.response
  }
}
