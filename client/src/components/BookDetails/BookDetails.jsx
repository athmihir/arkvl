import React from 'react';
import './BookDetails.styles.css';
import ReactStars from 'react-rating-stars-component';
import CustomButton from '../../components/CustomButton/CustomButton';
const BookTitle = ({
  booktitleis,
  bookauthoris,
  ratingChanged,
  amazonreadlink,
  bookgenreis,
  booksummary,
  avgRating,
  isCover,
}) => (
  <div className={`${isCover ? 'cover' : ''} book-details`}>
    <div className="book-card-details">
      <div>
        <p className="title">{booktitleis}</p>
        <p className="author">by {bookauthoris}</p>
      </div>
      {isCover ? null : (
        <>
          Rate the book
          <ReactStars
            count={5}
            size={20}
            color2={'var(--primary-color)'}
            className="ratingStars"
            onChange={ratingChanged}
          />
        </>
      )}
    </div>
    {isCover ? (
      <>
        <p className="genre">Genre - {bookgenreis}</p>
        <div className="rating-container">
          <span className="rating">Average Rating</span>
          <ReactStars
            count={5}
            size={24}
            color2={'var(--primary-color)'}
            className="ratingStars"
            edit={false}
            value={avgRating}
          />
        </div>
        <p className="book-summary">{booksummary}</p>
        <CustomButton invert={false}>Get a copy</CustomButton>
      </>
    ) : (
      <span className="read-now">
        <a className="anchor-css" href={amazonreadlink}>
          Read Now
        </a>
      </span>
    )}
  </div>
);

export default BookTitle;
