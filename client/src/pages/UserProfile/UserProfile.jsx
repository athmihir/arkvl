import React from 'react';
import UserDetails from '../../components/UserDetails/UserDetails';

import './UserProfile.styles.css';
import BookDirectory from '../../components/BookDirectory/BookDirectory';

export default function UserProfile() {
  return (
    <div className="user-profile-page">
      <UserDetails />
      <div className="user-favorites">
        <h1>Your Favorites.</h1>
        <BookDirectory />
      </div>
    </div>
  );
}
