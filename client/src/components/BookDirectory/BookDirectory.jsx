import React from 'react';
import BookCard from '../BookCard/BookCard';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './BookDirectory.styles.css';
export default function BookDirectory({ BOOKS, removeRated }) {
  return (
    <div className="book-directory">
      {Array.isArray(BOOKS) ? (
        BOOKS.map((book) => (
          <ReactCSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}
          >
            <BookCard
              book={book}
              bookno={book.id}
              removeRated={removeRated}
              key={book.id}
            />
          </ReactCSSTransitionGroup>
        ))
      ) : (
        <h1>
          Our team of highly trained API monkeys is working on the problem.
        </h1>
      )}
    </div>
  );
}
