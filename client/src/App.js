import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { connect } from 'react-redux';
import LoginRegister from './pages/LoginRegister/LoginRegister';
import SideBar from './components/sidebar/sidebar';
import Recommended from './pages/Recommended/Recommended';
import Trending from './pages/Trending/Trending';
import UserProfile from './pages/UserProfile/UserProfile';
import BookSummary from './pages/BookSummary/BookSummary';

function App({ isAuthenticated }) {
  return (
    <div className="App">
      <ToastContainer />
      <Switch>
        <Route
          exact
          path="/"
          render={() => (isAuthenticated ? <Recommended /> : <LoginRegister />)}
        />
        <Route
          exact
          path="/trending"
          render={() => (isAuthenticated ? <Trending /> : <LoginRegister />)}
        />
        <Route
          path="/login"
          render={() => (isAuthenticated ? <Recommended /> : <LoginRegister />)}
        />
        <Route
          path="/isAuthenticated-profile"
          render={() => (isAuthenticated ? <Recommended /> : <UserProfile />)}
        />
        <Route
          path="/book-summary"
          render={() => (isAuthenticated ? <Recommended /> : <BookSummary />)}
        />
      </Switch>
      <SideBar />
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
});

export default connect(mapStateToProps)(App);
