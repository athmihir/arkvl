import React from 'react';
import BookDirectory from '../../components/BookDirectory/BookDirectory';

import './Recommended.styles.css';

export default function Recommended() {
  return (
    <div className="recommended-books">
      <h1> For You.</h1>
      <BookDirectory />
    </div>
  );
}
