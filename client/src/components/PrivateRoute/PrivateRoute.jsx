import React from 'react';
import { connect } from 'react-redux';
import LoginRegister from '../../pages/LoginRegister/LoginRegister';

const PrivateRoute = ({
  as: Comp,
  isAuthenticated,
  pageVariants,
  pageTransition,
  ...props
}) => {
  return isAuthenticated ? (
    <Comp
      pageTransition={pageTransition}
      pageVariants={pageVariants}
      {...props}
    />
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
