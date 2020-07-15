import React from 'react';
import BookCard from '../BookCard/BookCard';
import { CSSTransition } from 'react-transition-group';
import './BookDirectory.styles.css';
import BookDirectorySkeleton from '../Skeleton/skeleton';

export default function BookDirectory({ BOOKS, removeRated }) {
  return (
    <div className="book-directory">
      {BOOKS && BOOKS.length > 0
        ? BOOKS.map((book) => (
            <CSSTransition key={book.id} timeout={1000}>
              <BookCard
                book={book}
                bookno={book.id}
                removeRated={removeRated}
              />
            </CSSTransition>
          ))
        : [...Array(20)].map((value, index) => {
            return <BookDirectorySkeleton key={index} />;
          })}
    </div>
  );
}
