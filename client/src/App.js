import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { connect } from 'react-redux';

import { checkUserStatus } from './redux/user/user.actions';
import LoginRegister from './pages/LoginRegister/LoginRegister';
import SideBar from './components/sidebar/sidebar';
import Recommended from './pages/Recommended/Recommended';
import Trending from './pages/Trending/Trending';
import UserProfile from './pages/UserProfile/UserProfile';
import BookSummary from './pages/BookSummary/BookSummary';
import Error404 from './pages/404/404';
import Loader from './components/loader/loader.component';

class App extends React.Component {
  render() {
    const { isAuthenticated } = this.props;
    if (isAuthenticated === undefined) {
      this.props.checkUserLoggedIn();
    }
    return (
      <div className="App">
        <ToastContainer />
        {isAuthenticated === undefined ? (
          <Loader />
        ) : (
          <Switch>
            <Route
              exact
              path="/"
              render={() =>
                isAuthenticated ? <Recommended /> : <LoginRegister />
              }
            />
            <Route
              exact
              path="/trending"
              render={() =>
                isAuthenticated ? <Trending /> : <LoginRegister />
              }
            />
            <Route
              path="/login"
              render={() =>
                isAuthenticated ? <Recommended /> : <LoginRegister />
              }
            />
            <Route
              path="/user-profile"
              render={() =>
                isAuthenticated ? <UserProfile /> : <LoginRegister />
              }
            />
            <Route
              path="/book-summary/:bookid"
              component={BookSummary}
              render={() =>
                isAuthenticated ? <BookSummary /> : <LoginRegister />
              }
            />
            <Route path="/404" component={Error404} />
          </Switch>
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
