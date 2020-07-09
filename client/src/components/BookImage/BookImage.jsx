import React from 'react';
import './BookImage.styles.css';
import { Link } from 'react-router-dom';

const BookImage = ({ imagesource, isCover, bookid }) => (
  <>
    <Link to={`/book-summary/${bookid}`}>
      <img
        className={isCover ? 'cover-image' : 'book-image'}
        src={imagesource}
        alt="book-cover"
      />
    </Link>
  </>
);

export default BookImage;
