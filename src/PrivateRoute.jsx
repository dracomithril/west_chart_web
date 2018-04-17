import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, path, ...rest }, { store }) => {
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
              state: { from: path },
            }}
          />
        )
      }
    />
  );
};
PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  path: PropTypes.string,
};
PrivateRoute.contextTypes = {
  store: PropTypes.object,
};
PrivateRoute.defaultProps = {
  path: '/',
};

export default PrivateRoute;
