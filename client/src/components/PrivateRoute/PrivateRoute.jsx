import React, { lazy } from 'react';
import { connect } from 'react-redux';
import LoginRegister from '../../pages/LoginRegister/LoginRegister';
const Landing = lazy(() => import('../../pages/LandingPage/Landing'));

const PrivateRoute = ({
  as: Comp,
  isAuthenticated,
  pageVariants,
  pageTransition,
  root,
  ...props
}) => {
  return isAuthenticated ? (
    <Comp
      pageTransition={pageTransition}
      pageVariants={pageVariants}
      {...props}
    />
  ) : root ? (
    <Landing pageTransition={pageTransition} pageVariants={pageVariants} />
  ) : (
    <LoginRegister
      pageTransition={pageTransition}
      pageVariants={pageVariants}
    />
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
});

export default connect(mapStateToProps)(PrivateRoute);
