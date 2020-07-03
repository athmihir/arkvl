import React from 'react';
/*import { BOOKS } from '../../shared/books';*/
import BookCard from '../BookCard/BookCard';

import './BookDirectory.styles.css';
export default function BookDirectory({ BOOKS }) {
  console.log(BOOKS);
  return (
    <div className="book-directory">
      {BOOKS.map((book) => (
        <BookCard book={book} key={book.id} />
      ))}
    </div>
  );
}
