import React, { useState } from 'react';
import BookCard from '../../components/BookImage/BookImage';
import BookDetails from '../../components/BookDetails/BookDetails';
import ReactStars from 'react-rating-stars-component';
import SINGLEBOOK from '../../shared/singleBookDetail';

import './BookSummary.styles.css';

function BookSummary() {
  const [rating, setRating] = useState(null);
  const ratingChanged = (newRating) => {
    setRating(newRating);
  };
  return (
    <div className="book-summary-container">
      <div className="book-image-container">
        <BookCard imagesource={SINGLEBOOK.image} isCover />
        <div>
          {SINGLEBOOK.userRating ? (
            <div className="rating-container">
              <span className="rating">You Rated</span>
              <ReactStars
                count={5}
                size={24}
                color2={'var(--primary-color)'}
                className="ratingStars"
                edit={false}
                value={SINGLEBOOK.userRating}
              />
            </div>
          ) : (
            <div className="rating-container">
              <h3 className="rating">Rate Now</h3>
              <ReactStars
                count={5}
                size={24}
                color2={'var(--primary-color)'}
                className="ratingStars"
                onChange={ratingChanged}
              />
            </div>
          )}
        </div>
      </div>
      <BookDetails
        booktitleis={SINGLEBOOK.title}
        bookauthoris={SINGLEBOOK.author}
        bookgenreis={SINGLEBOOK.bookgenre}
        booksummary={SINGLEBOOK.bookdescription}
        avgRating={SINGLEBOOK.avgRating}
        isCover
      />
    </div>
  );
}

export default BookSummary;
