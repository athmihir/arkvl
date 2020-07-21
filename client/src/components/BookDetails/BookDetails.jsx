import React, { useState } from 'react';
import './BookDetails.styles.css';
import ReactStars from 'react-rating-stars-component';
import { Link } from 'react-router-dom';

const BookTitle = ({
  booktitleis,
  bookauthoris,
  ratingChanged,
  bookid,
  rating,
}) => {
  const [isShown, setIsShown] = useState(false);
  return (
    <div className={`book-details`}>
      <div className="book-card-details">
        <div>
          <p className="title">{booktitleis}</p>
          <p className="author">by {bookauthoris}</p>
        </div>
        <div className="book-rating">
          {rating !== undefined || rating === 0 ? `Rate this book` : `Edit Rating`}
          <div
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
          >
            <ReactStars
              count={5}
              size={25}
              color2="var(--primary-color)"
              className="ratingStars"
              onChange={ratingChanged}
              half={false}
              value={rating}
            />
            {isShown && rating > 0 && <span>Clear Rating</span>}
          </div>
        </div>
      </div>

      <span className="read-now">
        <Link to={`/book-summary/${bookid}`}>Read Now</Link>
      </span>
    </div>
  );
};
export default BookTitle;
