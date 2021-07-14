import React from 'react';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import WeeklyMenu from './components/WeeklyMenu/WeeklyMenu';
import AddRecipe from './components/Recipes/AddRecipe';

export default function Router() {
  return (
    <Switch>
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
    </Switch>
  )
}