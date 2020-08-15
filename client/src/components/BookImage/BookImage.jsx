import React from 'react';
import './BookImage.styles.css';
import { Link } from '@reach/router';

const BookImage = ({ imagesource, isCover, bookid }) => (
  <>
    {bookid ? (
      <Link to={`/app/book-summary/${bookid}`}>
        {' '}
        <img
          className={isCover ? 'cover-image' : 'book-image'}
          src={imagesource}
          alt="book-cover"
        />
      </Link>
    ) : (
      <img
        className={isCover ? 'cover-image' : 'book-image'}
        src={imagesource}
        alt="book-cover"
      />
    )}
  </>
);

export default BookImage;
