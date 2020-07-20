import React, { useRef, Fragment } from 'react';
import Glide from 'react-glidejs';
import leftArrow from '../../assets/icons/chevron_left-black-18dp.svg';
import rightArrow from '../../assets/icons/chevron_right-black-18dp.svg';
import BookCard from '../BookCard/BookCard';
import 'react-glidejs/dist/index.css';

const Slider = ({ books }) => {
  const gliderRef = useRef(null);

  return (
    <Glide
      ref={gliderRef}
      type="slider"
      animationDuration={500}
      perView={5}
      keyboard={true}
      slideClassName="slider__frame"
      rewindDuration={700}
      focusAt={0}
    >
      {books && books.length > 0
        ? books.map((book) => (
            <Fragment>
              <BookCard book={book} bookno={book.id} key={book.id} />
            </Fragment>
          ))
        : null}
    </Glide>
  );
};

export default Slider;
