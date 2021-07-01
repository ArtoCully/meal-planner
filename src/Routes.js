import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import WeeklyMenu from './components/WeeklyMenu/WeeklyMenu';

export default function Router() {
  return (
    <Switch>
      <Route path="/">
        <WeeklyMenu />
      </Route>
      <Route path="/add-receipe">
      </Route>
    </Switch>
  )
}