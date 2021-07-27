import React from 'react';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import WeeklyMenu from './components/WeeklyMenu/WeeklyMenu';
import AddRecipe from './components/Recipes/AddRecipe';
import ListRecipe from './components/Recipes/ListRecipe';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';

export default function Router() {
  return (
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route
        exact
        path="/"
        render={() => {
          return <Redirect to="/menu/weekly"/>;
        }}
      >
      </Route>
      <Route path="/menu/weekly">
        <WeeklyMenu />
      </Route>
      <Route path="/recipes/add">
        <AddRecipe />
      </Route>
      <Route path="/recipes/list">
        <ListRecipe />
      </Route>
    </Switch>
  )
}