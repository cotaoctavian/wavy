import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from './Auth';

const PrivateRoute = ({ component: Component, ...props }) => {

    return (
        <Route
            {...props}
            render={routeProps =>
                Auth.isAuthenticated() ? <Component {...routeProps} /> : <Redirect to={"/"} />
            }
        />
    );
};

export default PrivateRoute;