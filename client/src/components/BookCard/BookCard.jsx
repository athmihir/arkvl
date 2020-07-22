import React from 'react';
import BookImage from '../BookImage/BookImage';
import BookDetails from '../BookDetails/BookDetails';
import Skeleton from 'react-loading-skeleton';
import axios from 'axios';
import { motion } from 'framer-motion';
import './BookCard.styles.css';
import { toast, Slide } from 'react-toastify';

const BookCard = ({ book, bookno, removeRated, removeOnClear }) => {
  const [rating, setRating] = React.useState(book.rating || undefined);
  const ratingChanged = (newRating) => {
    axios
      .post('/api/new-rating', {
        rating: newRating,
        book_id: book.id,
      })
      .then((res) => {
        setRating(newRating);
        removeRated && removeRated(book.id);
      })
      .catch((err) => {
        console.log(err);
        toast.error('Something went wrong. Please try again', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Slide,
        });
      });
  };

  const clearRating = () => {
    axios
      .put('/api/new-rating', {
        rating: 0,
        book_id: book.id,
      })
      .then((res) => {
        setRating(0);
        removeOnClear && removeOnClear(book.id);
      })
      .catch((err) => {
        console.log(err);
        toast.error('Something went wrong. Please try again', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Slide,
        });
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="book-card"
    >
      {<BookImage imagesource={book.image} bookid={bookno} /> || <Skeleton />}
      <BookDetails
        booktitleis={book.title}
        bookauthoris={book.author}
        ratingChanged={ratingChanged}
        bookid={bookno}
        rating={rating}
        clearRating={clearRating}
      />
    </motion.div>
  );
};

export default BookCard;
