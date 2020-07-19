import React from 'react';
import ReactStars from 'react-rating-stars-component';
import { Link } from 'react-router-dom';

function BookCover({
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
}) {
  return (
    <div className="cover book-details">
      <div className="book-card-details">
        <div>
          <p className="title">{booktitleis}</p>
          <p className="author">by {bookauthoris}</p>
        </div>
      </div>
      <p className="paraGenre">
        <span className="spanGenre">Genre</span> -
        <span className="genre">{bookgenreis}</span>
      </p>
      <div className="avg-rating-container">
        <span className="rating">Average Rating</span>
        <ReactStars
          count={5}
          size={20}
          color2="var(--primary-color)"
          className="ratingStars"
          edit={false}
          half={false}
          value={avgRating}
        />
      </div>
      <div>
        <p className="aboutBook">About this book - </p>
        <p
          className="book-summary"
          dangerouslySetInnerHTML={{ __html: booksummary }}
        />
      </div>
      <span className="book-link">
        Get a copy -
        <a href={amazonreadlink} target="_blank" rel="noopener noreferrer">
          Amazon
        </a>
      </span>
    </div>
  );
}

export default BookCover;
