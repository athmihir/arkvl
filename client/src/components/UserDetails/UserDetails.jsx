import React from 'react';

import './UserDetails.styles.css';

function UserDetails({ booksRated, dateJoined, favGenres, username }) {
  return (
    <div className="user-details">
      <div>
        <div className="user-name">{username ? <h1>{username}</h1> : null}</div>
        <div className="user-details-container">
          <div className="user-details-item">
            {dateJoined ? (
              <>
                <h4>Details </h4>
                <span>Joined on {dateJoined}</span>{' '}
              </>
            ) : null}
          </div>
          <div className="user-details-item">
            {booksRated ? (
              <>
                <h4>Books Rated </h4>
                <span>{booksRated}</span>
              </>
            ) : null}
          </div>
          <div className="user-details-item">
            {favGenres ? (
              <>
                <h4>Favorite Genres</h4>
                <span>{favGenres}</span>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
