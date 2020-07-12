import React from 'react';
import BookCard from '../BookCard/BookCard';
import { CSSTransition } from 'react-transition-group';
import './BookDirectory.styles.css';
import BookDirectorySkeleton from '../Skeleton/skeleton';

export default function BookDirectory({ BOOKS, removeRated }) {
  const elements = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
  ];
  // console.log(BOOKS);
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
        : elements.map((value, index) => {
            return <BookDirectorySkeleton key={index} />;
          })}
    </div>
  );
}
