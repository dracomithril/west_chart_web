import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({
  component: Component, path, facebookUser, ...rest
}) => {
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
PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  path: PropTypes.string,
  facebookUser: PropTypes.shape(),
};

PrivateRoute.defaultProps = {
  path: '/',
};

const mapStateToProps = ({ facebookUser } /* , ownProps */) => ({
  facebookUser,
});

export default connect(mapStateToProps)(PrivateRoute);
