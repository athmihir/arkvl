import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import './BookDetails.styles.css';
import ReactStars from 'react-rating-stars-component';
import { Link } from '@reach/router';

const BookTitle = ({
  booktitleis,
  bookauthoris,
  ratingChanged,
  bookid,
  rating,
  clearRating,
}) => {
  const [isShown, setIsShown] = useState(false);

  console.log(rating);
  return (
    <div className={`book-details`}>
      <div className="book-card-details">
        <div>
          <p className="title">{booktitleis}</p>
          <p className="author">by {bookauthoris}</p>
        </div>
        <div className="book-rating">
          {rating !== undefined || rating === 0
            ? `Edit Rating`
            : `Rate this book`}
          <div
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
            style={{
              flexDirection: isMobile ? 'column' : 'row',
              width: !isMobile && '16em',
            }}
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
            {isMobile ? (
              <button
                className="clear-rating-button"
                onClick={clearRating}
                style={{ alignSelf: 'baseline', padding: 0, marginTop: '3px' }}
              >
                Clear Rating
              </button>
            ) : (
              isShown &&
              rating > 0 && (
                <button className="clear-rating-button" onClick={clearRating}>
                  Clear Rating
                </button>
              )
            )}
          </div>
        </div>
      </div>

      <span className="read-now">
        <Link to={`book-summary/${bookid}`}>Read Now</Link>
      </span>
    </div>
  );
};
export default BookTitle;
