import React, { useState } from 'react';
import BookImage from '../BookImage/BookImage';
import BookDetails from '../BookDetails/BookDetails';
import './BookCard.styles.css';

export default function BookCard({ book }) {
  const [rating, setRating] = useState(null);
  const ratingChanged = (newRating) => {
    setRating(newRating);
  };
  return (
    <div className="book-card">
      <BookImage imagesource={book.image} />
      <BookDetails
        booktitleis={book.title}
        bookauthoris={book.author}
        ratingChanged={ratingChanged}
      />
    </div>
  );
}
