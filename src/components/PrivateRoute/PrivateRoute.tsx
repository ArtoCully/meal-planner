import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import useAuth from 'src/hooks/useAuth';

interface IPrivateRouteProps {
  component?: React.ReactNode,
}

const PrivateRoute: React.FC<IPrivateRouteProps> = ({ component, ...rest }) => {
    const { currentUser } = useAuth();

    return (
        <Route {...rest} render={props => {
            const Component = component as any;

            if (!currentUser) {
                // not logged in so redirect to login page with the return url
                return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            }

            // authorised so return component
            return <Component {...props} />
        }} />
    )
}

export default PrivateRoute;
