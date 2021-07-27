import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getCurrentUser } from '../../services/authenticate';

interface IPrivateRouteProps {
  component?: React.ReactNode,
}

export const PrivateRoute: React.FC<IPrivateRouteProps> = ({ component, ...rest }) => (
    <Route {...rest} render={props => {
        const currentUser = getCurrentUser();
        const Component = component as any;

        if (!currentUser) {
            // not logged in so redirect to login page with the return url
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }

        // authorised so return component
        return <Component {...props} />
    }} />
)
