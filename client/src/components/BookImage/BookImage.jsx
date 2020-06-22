import React from 'react';
import './BookImage.styles.css';

const BookImage = ({ imagesource }) => (
  <img className="book-image" src={imagesource} />
);

export default BookImage;
