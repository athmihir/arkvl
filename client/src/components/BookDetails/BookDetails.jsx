import React from 'react';
import './BookDetails.styles.css';

const BookTitle = ({ booktitleis, bookauthoris, amazonreadlink }) => (
  <div className="book-details">
    <span className="title">{booktitleis}</span>
    <span className="author">by {bookauthoris}</span>
    <span className="read-now">
      <a className="anchor-css" href={amazonreadlink}>
        Read Now
      </a>
    </span>
  </div>
);

export default BookTitle;
