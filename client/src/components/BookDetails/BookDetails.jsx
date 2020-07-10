import React from 'react';
import './BookDetails.styles.css';
import ReactStars from 'react-rating-stars-component';
import { Link } from 'react-router-dom';

const BookTitle = ({
  booktitleis,
  bookauthoris,
  ratingChanged,
  bookid,
  amazonreadlink,
  bookgenreis,
  booksummary,
  avgRating,
  isCover,
  rating,
}) => (
    <div className={`${isCover ? 'cover' : ''} book-details`}>
      <div className="book-card-details">
        <div>
          <p className="title">{booktitleis}</p>

          <p className="author">by {bookauthoris}</p>
        </div>
        {isCover ? null : (
          <div className="book-rating">
            Rate this book
            <ReactStars
              count={5}
              size={18}
              color2={'var(--primary-color)'}
              className="ratingStars"
              onChange={ratingChanged}
              half={false}
            />
          </div>
        )}
      </div>
      {isCover ? (
        <>
          <p className="paraGenre">
            <span className="spanGenre">Genre</span> - <span className="genre">{bookgenreis}</span>
          </p>
          <div className="avg-rating-container">
            <span className="rating">Average Rating</span>
            <ReactStars
              count={5}
              size={18}
              color2={'var(--primary-color)'}
              className="ratingStars"
              edit={false}
              value={avgRating}
            />
          </div>
          <div>
            <p className="aboutBook">About this book - </p>
            <p
              className="book-summary"
              dangerouslySetInnerHTML={{ __html: booksummary }}
            ></p>
          </div>
          <span className="book-link">
            Get a copy - <Link>Amazon</Link>
          </span>
        </>
      ) : (
          <span className="read-now">
            <Link to={`/book-summary/${bookid}`}>Read Now</Link>
          </span>
        )}
    </div>
  );

export default BookTitle;
