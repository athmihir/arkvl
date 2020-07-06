import React from 'react';
import BookCard from '../BookCard/BookCard';

import './BookDirectory.styles.css';
export default function BookDirectory({ BOOKS, removeRated }) {
  return (
    <div className="book-directory">
      {BOOKS &&
        BOOKS.map((book) => (
          <BookCard
            book={book}
            bookno={book.id}
            removeRated={removeRated}
            key={book.id}
          />
        ))}
    </div>
  );
}
