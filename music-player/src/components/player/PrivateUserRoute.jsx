import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateUserRoute = ({ component: Component, ...props }) => {

    return (
        <Route
            {...props}
            render={routeProps =>
                localStorage.getItem('token') !== "null" ?
                    <Component {...routeProps} /> : <Redirect to={"/"} />
            }
        />
    );
};

export default PrivateUserRoute;