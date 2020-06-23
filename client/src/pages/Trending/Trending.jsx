import React from 'react';
import BookDirectory from '../../components/BookDirectory/BookDirectory';

import './Trending.styles.css';

export default function Recommended() {
  return (
    <div className="trending-books">
      <h1>Trending.</h1>
      <BookDirectory />
    </div>
  );
}
