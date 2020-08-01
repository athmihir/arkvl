import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { connect } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import { Router, Location } from '@reach/router';

import { checkUserStatus } from './redux/user/user.actions';
import LoginRegister from './pages/LoginRegister/LoginRegister';
import SideBar from './components/sidebar/sidebar';
import Recommended from './pages/Recommended/Recommended';
import Library from './pages/Library/Library';
import UserProfile from './pages/UserProfile/UserProfile';
import BookSummary from './pages/BookSummary/BookSummary';
import Error404 from './pages/404/404';
import Loader from './components/loader/loader.component';
import Search from './pages/search/search';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ResetPassword from './pages/ResetPassword/ResetPassword';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import ForgotRoute from './components/ForgotRoute/ForgotRoute';
import Header from './components/Header/Header';
import { MobileView } from 'react-device-detect';

class App extends React.Component {
  render() {
    const { isAuthenticated } = this.props;
    if (isAuthenticated === undefined) {
      setTimeout(this.props.checkUserLoggedIn, 1000);
    }
    const pageVariants = {
      initial: {
        opacity: 0,
      },
      in: {
        opacity: 1,
      },
      out: {
        opacity: 0,
      },
    };

    const pageTransition = {
      type: 'tween',
      ease: 'linear',
      duration: 0.2,
    };

    return (
      <div className="App">
        <ToastContainer />
        {isAuthenticated === false && <Header />}
        {isAuthenticated && (
          <MobileView>
            <Header />
          </MobileView>
        )}
        {isAuthenticated === undefined ? (
          <Loader />
        ) : (
          <AnimatePresence exitBeforeEnter>
            <Location>
              {({ location }) => (
                <Router location={location} key={location.pathname}>
                  <PrivateRoute
                    as={Recommended}
                    path="/"
                    pageVariants={pageVariants}
                    pageTransition={pageTransition}
                  />
                  <PrivateRoute
                    as={Library}
                    path="library"
                    pageVariants={pageVariants}
                    pageTransition={pageTransition}
                  />
                  <PrivateRoute
                    as={Search}
                    path="search"
                    pageVariants={pageVariants}
                    pageTransition={pageTransition}
                  />
                  <PrivateRoute
                    as={LoginRegister}
                    path="login"
                    pageVariants={pageVariants}
                    pageTransition={pageTransition}
                  />
                  <PrivateRoute
                    as={BookSummary}
                    path="book-summary/:bookid"
                    pageVariants={pageVariants}
                    pageTransition={pageTransition}
                  />
                  <PrivateRoute
                    as={UserProfile}
                    path="user-profile"
                    pageVariants={pageVariants}
                    pageTransition={pageTransition}
                  />
                  <ForgotRoute
                    as={ForgotPassword}
                    path="forgot-password"
                    pageVariants={pageVariants}
                    pageTransition={pageTransition}
                  />
                  <ForgotRoute
                    as={ResetPassword}
                    path="change-password/:token"
                    pageVariants={pageVariants}
                    pageTransition={pageTransition}
                  />
                  <PrivateRoute
                    as={Recommended}
                    path="verified/:token"
                    pageVariants={pageVariants}
                    pageTransition={pageTransition}
                  />
                  <Error404 default />
                </Router>
              )}
            </Location>
          </AnimatePresence>
        )}
        {isAuthenticated ? <SideBar /> : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserLoggedIn: () => dispatch(checkUserStatus()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
