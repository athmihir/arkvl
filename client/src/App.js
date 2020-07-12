import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { connect } from 'react-redux';

import { checkUserStatus } from './redux/user/user.actions';
import LoginRegister from './pages/LoginRegister/LoginRegister';
import SideBar from './components/sidebar/sidebar';
import Recommended from './pages/Recommended/Recommended';
import Trending from './pages/Trending/Trending';
import UserProfile from './pages/UserProfile/UserProfile';
import BookSummary from './pages/BookSummary/BookSummary';

class App extends React.Component {
  componentDidMount() {
    console.log(this.props.isAuthenticated);
    if (this.props.isAuthenticated === undefined) {
      this.props.checkUserLoggedIn();
    }
  }
  render() {
    const { isAuthenticated } = this.props;
    console.log(isAuthenticated);
    return (
      <div className="App">
        <ToastContainer />
        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              isAuthenticated !== undefined ? (
                isAuthenticated ? (
                  <Recommended />
                ) : (
                  <LoginRegister />
                )
              ) : (
                <LoginRegister />
              )
            }
          />
          <Route
            exact
            path="/trending"
            render={() =>
              isAuthenticated !== undefined ? (
                isAuthenticated ? (
                  <Trending />
                ) : (
                  <LoginRegister />
                )
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            path="/login"
            render={() =>
              isAuthenticated !== undefined ? (
                isAuthenticated ? (
                  <Recommended />
                ) : (
                  <LoginRegister />
                )
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            path="/user-profile"
            render={() =>
              isAuthenticated !== undefined ? (
                isAuthenticated ? (
                  <UserProfile />
                ) : (
                  <LoginRegister />
                )
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            path="/book-summary/:bookid"
            component={BookSummary}
            render={() =>
              isAuthenticated !== undefined ? (
                isAuthenticated ? (
                  <BookSummary />
                ) : (
                  <LoginRegister />
                )
              ) : (
                <Redirect to="/" />
              )
            }
          />
        </Switch>
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
