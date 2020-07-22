import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Switch, withRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { connect } from 'react-redux';
import { AnimatePresence } from 'framer-motion';

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
        {isAuthenticated === undefined ? (
          <Loader />
        ) : (
          <AnimatePresence exitBeforeEnter>
            <Switch
              location={this.props.location}
              key={this.props.location.pathname}
            >
              <Route
                exact
                path="/"
                render={() =>
                  isAuthenticated ? (
                    <Recommended
                      pageVariants={pageVariants}
                      pageTransition={pageTransition}
                    />
                  ) : (
                    <LoginRegister
                      pageVariants={pageVariants}
                      pageTransition={pageTransition}
                    />
                  )
                }
              />
              <Route
                exact
                path="/library"
                render={() =>
                  isAuthenticated ? (
                    <Library
                      pageVariants={pageVariants}
                      pageTransition={pageTransition}
                    />
                  ) : (
                    <LoginRegister
                      pageVariants={pageVariants}
                      pageTransition={pageTransition}
                    />
                  )
                }
              />
              <Route
                exact
                path="/search"
                render={() =>
                  isAuthenticated ? (
                    <Search
                      pageVariants={pageVariants}
                      pageTransition={pageTransition}
                    />
                  ) : (
                    <LoginRegister
                      pageVariants={pageVariants}
                      pageTransition={pageTransition}
                    />
                  )
                }
              />
              <Route
                path="/login"
                render={() =>
                  isAuthenticated ? (
                    <Recommended
                      pageVariants={pageVariants}
                      pageTransition={pageTransition}
                    />
                  ) : (
                    <LoginRegister
                      pageVariants={pageVariants}
                      pageTransition={pageTransition}
                    />
                  )
                }
              />
              <Route
                path="/user-profile"
                render={() =>
                  isAuthenticated ? (
                    <UserProfile
                      pageVariants={pageVariants}
                      pageTransition={pageTransition}
                    />
                  ) : (
                    <LoginRegister
                      pageVariants={pageVariants}
                      pageTransition={pageTransition}
                    />
                  )
                }
              />
              <Route
                path="/book-summary/:bookid"
                component={BookSummary}
                render={() =>
                  isAuthenticated ? (
                    <BookSummary
                      pageVariants={pageVariants}
                      pageTransition={pageTransition}
                    />
                  ) : (
                    <LoginRegister
                      pageVariants={pageVariants}
                      pageTransition={pageTransition}
                    />
                  )
                }
              />
              <Route
                render={() => (
                  <Error404
                    pageVariants={pageVariants}
                    pageTransition={pageTransition}
                  />
                )}
              />
            </Switch>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
