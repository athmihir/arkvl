import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { connect } from 'react-redux';
import LoginRegister from './pages/LoginRegister/LoginRegister';
import SideBar from './components/sidebar/sidebar';
import Recommended from './pages/Recommended/Recommended';
import Trending from './pages/Trending/Trending';
import UserProfile from './pages/UserProfile/UserProfile';
import BookSummary from './pages/BookSummary/BookSummary';

function App({ user }) {
  console.log(user);
  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/"
          render={() => (user ? <Recommended /> : <LoginRegister />)}
        />
        <Route
          exact
          path="/trending"
          render={() => (user ? <Trending /> : <LoginRegister />)}
        />
        <Route
          path="/login"
          render={() => (user ? <Recommended /> : <LoginRegister />)}
        />
        <Route
          path="/user-profile"
          render={() => (user ? <Recommended /> : <UserProfile />)}
        />
        <Route
          path="/book-summary"
          render={() => (user ? <Recommended /> : <BookSummary />)}
        />
      </Switch>
      <SideBar />
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect()(App);
