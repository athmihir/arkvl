import React from 'react';
import { Route, Switch } from 'react-router-dom';

import LoginRegister from './pages/LoginRegister/LoginRegister';
import SideBar from './components/sidebar/sidebar';
import Recommended from './pages/Recommended/Recommended';
import Trending from './pages/Trending/Trending';
import UserProfile from './pages/UserProfile/UserProfile';
import BookSummary from './pages/BookSummary/BookSummary';

function App() {
  return (
    <div className="App">
      {/* <Switch>
        <Route exact path="/" component={Recommended} />
        <Route exact path="/trending" component={Trending} />
        <Route path="/login" component={LoginRegister} />
        <Route path="/user-profile" component={UserProfile} />
      </Switch> */}
      <BookSummary />
      {/* <SideBar /> */}
    </div>
  );
}

export default App;
