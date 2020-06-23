import React from 'react';
import LoginRegister from './pages/LoginRegister/LoginRegister';
import SideBar from './components/sidebar/sidebar';
import BookDirectory from './components/BookDirectory/BookDirectory';
import Recommended from './pages/Recommended/Recommended';

function App() {
  return (
    <div className="App">
      {/* <LoginRegister /> */}
      <Recommended />
      <SideBar />
    </div>
  );
}

export default App;
