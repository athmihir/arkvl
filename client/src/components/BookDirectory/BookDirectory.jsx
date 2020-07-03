import React from 'react';
import BookCard from '../BookCard/BookCard';

import './BookDirectory.styles.css';
export default function BookDirectory({ BOOKS }) {
  return (
    <div className="book-directory">
      {BOOKS && BOOKS.map((book) => <BookCard book={book} key={book.id} />)}
    </div>
  );
}
