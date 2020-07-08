import React from 'react';
import './BookDetails.styles.css';
import ReactStars from 'react-rating-stars-component';
import CustomButton from '../../components/CustomButton/CustomButton';
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
}) => (
  <div className={`${isCover ? 'cover' : ''} book-details`}>
    <div className="book-card-details">
      <div>
        <p className="title">{booktitleis}</p>
        <p className="author">by {bookauthoris}</p>
      </div>
      {isCover ? null : (
        <div className="book-rating">
          Rate the book
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
        <p className="genre">Genre - {bookgenreis}</p>
        <div className="rating-container">
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
        <p
          className="book-summary"
          dangerouslySetInnerHTML={{ __html: booksummary }}
        ></p>
        <CustomButton invert={false}>Get a copy</CustomButton>
      </>
    ) : (
      <span className="read-now">
        <Link to={`/book-summary/${bookid}`}>Read Now</Link>
      </span>
    )}
  </div>
);

export default BookTitle;
