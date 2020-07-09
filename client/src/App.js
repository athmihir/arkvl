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

class App extends React.Component {
  componentDidMount() {
    console.log(this.props.isAuthenticated);
    if (this.props.isAuthenticated === undefined) {
      this.props.checkUserLoggedIn();
    }
  }
  render() {
    const { isAuthenticated } = this.props;
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
              ) : null
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
              ) : null
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
              ) : null
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
              ) : null
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
              ) : null
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
