import React from 'react';
import BookCard from '../BookCard/BookCard';

import './BookDirectory.styles.css';
export default function BookDirectory({
  BOOKS,
  removeRated,
  errorRemoveRated,
}) {
  return (
    <div className="book-directory">
      {BOOKS &&
        BOOKS.map((book) => (
          <BookCard
            book={book}
            bookno={book.id}
            removeRated={removeRated}
            errorRemoveRated={errorRemoveRated}
          />
        )
        )}
      {BOOKS.map(book => {
        console.log(book.id);
      })}
    </div>
  );
}
