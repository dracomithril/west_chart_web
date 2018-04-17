import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }, { store }) => {
  const { user } = store.getState();
  const isAuthenticated = !!user.id;
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: rest.path },
            }}
          />
        )
      }
    />
  );
};
PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.shape({ path: PropTypes.object }),
};
PrivateRoute.contextTypes = {
  store: PropTypes.object,
};

export default PrivateRoute;
