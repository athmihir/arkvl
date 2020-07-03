import React from 'react';
<<<<<<< HEAD
=======
/*import { BOOKS } from '../../shared/books';*/
>>>>>>> 7f8886f16ada67de11a7d319b451cc46cd70b16a
import BookCard from '../BookCard/BookCard';

import './BookDirectory.styles.css';
export default function BookDirectory({ BOOKS }) {
<<<<<<< HEAD
=======
  console.log(BOOKS);
>>>>>>> 7f8886f16ada67de11a7d319b451cc46cd70b16a
  return (
    <div className="book-directory">
      {BOOKS && BOOKS.map((book) => <BookCard book={book} key={book.id} />)}
    </div>
  );
}
