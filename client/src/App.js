import React, { lazy, Suspense } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { connect } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import { Router, Location } from '@reach/router';
import { MobileView } from 'react-device-detect';
import { checkUserStatus } from './redux/user/user.actions';
import Loader from './components/loader/loader.component';
import Header from './components/Header/Header';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import ForgotRoute from './components/ForgotRoute/ForgotRoute';
import SideBar from './components/sidebar/sidebar';

const LoginRegister = lazy(() => import('./pages/LoginRegister/LoginRegister'));
const Recommended = lazy(() => import('./pages/Recommended/Recommended'));
const Library = lazy(() => import('./pages/Library/Library'));
const UserProfile = lazy(() => import('./pages/UserProfile/UserProfile'));
const BookSummary = lazy(() => import('./pages/BookSummary/BookSummary'));
const Error404 = lazy(() => import('./pages/404/404'));
const Search = lazy(() => import('./pages/search/search'));
const ForgotPassword = lazy(() =>
  import('./pages/ForgotPassword/ForgotPassword'),
);
const ResetPassword = lazy(() => import('./pages/ResetPassword/ResetPassword'));

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
                <Suspense
                  fallback={<Loader />}
                  key={location.pathname}
                  location={location}
                >
                  <Router>
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
                </Suspense>
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
