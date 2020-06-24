import React from 'react';
import './BookImage.styles.css';

const BookImage = ({ imagesource, isCover }) => (
  <img
    className={isCover ? 'cover-image' : 'book-image'}
    src={imagesource}
    alt="book-cover"
  />
);

export default BookImage;
