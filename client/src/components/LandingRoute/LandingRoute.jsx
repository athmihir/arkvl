import React, { lazy } from 'react';
import { connect } from 'react-redux';
import LoginRegister from '../../pages/LoginRegister/LoginRegister';
const Recommended = lazy(() => import('../../pages/Recommended/Recommended'));

const LandingRoute = ({
    as: Comp,
    isAuthenticated,
    pageVariants,
    pageTransition,
    ...props
}) => {
    return isAuthenticated ? (
        <Recommended
            pageTransition={pageTransition}
            pageVariants={pageVariants}
            {...props}
        />
    ) : (
            <Comp
                pageTransition={pageTransition}
                pageVariants={pageVariants}
                {...props}
            />
        );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.user.isAuthenticated,
});

export default connect(mapStateToProps)(LandingRoute);
