import React from 'react';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { PrivateRoute } from 'src/components/PrivateRoute';
import { WeeklyMenu } from 'src/pages/Menu';
import { AddRecipe, ListRecipe } from 'src/pages/Recipes';
import { Login } from 'src/pages/Login';
import { Signup } from 'src/pages/Signup';

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
      <PrivateRoute path="/recipes/add" component={AddRecipe} />
      <Route path="/recipes/list">
        <ListRecipe />
      </Route>
    </Switch>
  )
}