import React from 'react';
import BookImage from '../BookImage/BookImage';
import BookDetails from '../BookDetails/BookDetails';
import Skeleton from 'react-loading-skeleton';
import axios from 'axios';
import './BookCard.styles.css';
import { toast } from 'react-toastify';

export default function BookCard({ book, bookno, removeRated }) {
  const ratingChanged = (newRating) => {
    axios
      .post('/api/new-rating', {
        rating: newRating,
        book_id: book.id,
      })
      .then((res) => removeRated(book.id))
      .catch((err) => {
        toast.error('Something went wrong. Please try again', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <div className="book-card">
      {<BookImage imagesource={book.image} bookid={bookno} /> || <Skeleton />}
      <BookDetails
        booktitleis={book.title}
        bookauthoris={book.author}
        ratingChanged={ratingChanged}
        bookid={bookno}
        rating={book.rating}
      />
    </div>
  );
}
