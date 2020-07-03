import React from 'react';
import BookCard from '../BookCard/BookCard';

import './BookDirectory.styles.css';
export default function BookDirectory({ data }) {
  return (
    <div className="book-directory">
      {data && data.map((book) => <BookCard book={book} key={book.id} />)}
    </div>
  );
}
