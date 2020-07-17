import React from 'react';
import BookCard from '../BookCard/BookCard';
import { AnimatePresence } from 'framer-motion';
import './BookDirectory.styles.css';
import BookDirectorySkeleton from '../Skeleton/skeleton';

export default function BookDirectory({ BOOKS, removeRated }) {
  return (
    <div className="book-directory">
      {BOOKS && BOOKS.length > 0 ? (
        <AnimatePresence>
          {BOOKS.map((book) => (
            <BookCard
              book={book}
              bookno={book.id}
              removeRated={removeRated}
              key={book.id}
            />
          ))}
        </AnimatePresence>
      ) : (
        [...Array(20)].map((value, index) => {
          return <BookDirectorySkeleton key={index} />;
        })
      )}
    </div>
  );
}
