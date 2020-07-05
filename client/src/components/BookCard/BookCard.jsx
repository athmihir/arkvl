import React, { useState } from 'react';
import BookImage from '../BookImage/BookImage';
import BookDetails from '../BookDetails/BookDetails';
import axios from 'axios';
import './BookCard.styles.css';
import { toast } from 'react-toastify';

export default function BookCard({ book, bookno, removeRated, errorRemoveRated }) {
  const [rating, setRating] = useState(null);
  const ratingChanged = (newRating) => {
    setRating(newRating);
    rating &&
      axios
        .post(`/new-rating/${book.id}`, {
          rating,
        })
        .then((res) => {
          if (res.data === 'OK') {
            removeRated(book.id);
          }
        })
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
      {console.log("here is the bookno")}
      {console.log({ bookno })}
      <BookImage imagesource={book.image} />
      <BookDetails
        booktitleis={book.title}
        bookauthoris={book.author}
        ratingChanged={ratingChanged}
        bookid={bookno}
      />
    </div>
  );
}
