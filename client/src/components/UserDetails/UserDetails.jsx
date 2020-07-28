import React from 'react';

import './UserDetails.styles.css';
import VerifiedSVG from './verified.svg'


function UserDetails({ booksRated, dateJoined, favGenres, username, verified }) {
  return (
    <div className="user-details">
      <div>
        <div className="user-name">
          <h1>{username}</h1>
          {console.log(verified)}
          {verified ? (
            <img src={VerifiedSVG} alt="Verified" className="verifiedSVG" />

          ) : (
              <div></div>
            )}
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
