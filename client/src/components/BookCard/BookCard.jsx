import React from 'react';
import BookImage from '../BookImage/BookImage';
import BookDetails from '../BookDetails/BookDetails';
import StarRating from '../Rating/Rating';
import './BookCard.styles.css';

export default function BookCard({ book }) {
  return (
    <div className="book-card">
      <BookImage imagesource={book.image} />
      <BookDetails booktitleis={book.title} bookauthoris={book.author} />
      <StarRating />
    </div>
  );
}
