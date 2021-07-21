import axios from 'axios';
import { IRecipe } from '../models/recipe';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
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

export async function createRecipe(params: IRecipe) {
  try {
    const result = await instance.post('/recipes', params)
      .catch((err) => {
        throw err;
      });
    return result;
  } catch (e) {
    console.log('create recipe error', e);
    return e.response
  }
}
