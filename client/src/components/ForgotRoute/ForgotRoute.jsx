import { Redirect } from '@reach/router';
import React from 'react';
import { connect } from 'react-redux';

const ForgotRoute = ({
  as: Comp,
  isAuthenticated,
  pageVariants,
  pageTransition,
  ...props
}) => {
  return isAuthenticated ? <Redirect to="/" noThrow /> : <Comp {...props} />;
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
});

export default connect(mapStateToProps)(ForgotRoute);
