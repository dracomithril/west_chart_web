// @flow
import * as React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import type { FacebookUser } from '../types';

type Props = {
  component: React.ComponentType<any>,
  path?: string,
  facebookUser: FacebookUser,
};

const PrivateRoute = ({
  component: Component, path, facebookUser, ...rest
}: Props) => {
  const isAuthenticated = !!facebookUser.id;
  return (
    <Route
      {...rest}
      render={props => (isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: path },
          }}
        />
      ))
      }
    />
  );
};

PrivateRoute.defaultProps = {
  path: '/',
};

const mapStateToProps = ({ facebookUser } /* , ownProps */) => ({
  facebookUser,
});

export default connect(mapStateToProps)(PrivateRoute);
