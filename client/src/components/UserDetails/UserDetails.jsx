import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as UserIcon } from '../../assets/useravatar.svg';

import './UserDetails.styles.css';

export default function UserDetails() {
  return (
    <div className="user-details">
      <UserIcon />
      <div>
        <div className="user-name">
          <h1>SkARfaCE</h1>
          <Link to="/"> Edit Profile</Link>
        </div>
        <div className="user-username">
          <span>@scarface</span>
        </div>
        <div className="user-details-container">
          <div className="user-details-item">
            <h4>Details </h4>
            <span>Joined on Apr 20, 1969</span>
          </div>
          <div className="user-details-item">
            <h4>Books Rated </h4>
            <span>60</span>
          </div>
          <div className="user-details-item">
            <h4>Favorite Genres</h4>
            <span>Fiction, Science Fiction, Suspense, Comics</span>
          </div>
        </div>
      </div>
    </div>
  );
}
