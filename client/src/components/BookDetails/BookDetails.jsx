import React from 'react';
import './BookDetails.styles.css';

const BookTitle = ({
  booktitleis,
  bookauthoris,
  amazonreadlink,
  bookgenreis,
  booksummary,
  isCover,
}) => (
  <div className={`${isCover ? 'cover' : ''} book-details`}>
    <span className="title">{booktitleis}</span>
    <span className="author">by {bookauthoris}</span>
    {isCover ? (
      <>
        <p className="genre">Genre - {bookgenreis}</p>
        <p className="book-summary">{booksummary}</p>
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
