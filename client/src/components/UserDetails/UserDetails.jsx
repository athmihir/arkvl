import React from 'react';
import { Link } from 'react-router-dom';

import './UserDetails.styles.css';

function UserDetails({ booksRated, dateJoined, favGenres, username }) {
  return (
    <div className="user-details">
      <div>
        <div className="user-name">
          <h1>{username}</h1>
          <Link to="/"> Edit Profile</Link>
        </div>
        <div className="user-details-container">
          <div className="user-details-item">
            <h4>Details </h4>
            <span>Joined on {dateJoined}</span>
          </div>
          <div className="user-details-item">
            <h4>Books Rated </h4>
            <span>{booksRated}</span>
          </div>
          <div className="user-details-item">
            <h4>Favorite Genres</h4>
            <span>{favGenres}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
