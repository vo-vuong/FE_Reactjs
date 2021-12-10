import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const loggedInAdmin = useSelector((state) => state.user.currentAdmin);
  const isLoggedInAdmin = !!(loggedInAdmin.roles === 'ROLE_ADMIN');

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLoggedInAdmin) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: '/admin/login',
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};
