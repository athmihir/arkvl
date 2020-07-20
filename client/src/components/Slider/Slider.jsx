import React from 'react';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import { AnimatePresence } from 'framer-motion';
import BookCard from '../BookCard/BookCard';
import './Slider.styles.css';

const Slider = ({ books }) => {
  const carouselRef = React.useRef(null);
  return (
    <>
      {books && books.length > 0 ? (
        <AnimatePresence>
          <Carousel
            arrows
            slidesPerPage={4}
            slidesPerScroll={3}
            infinite
            draggable={false}
            ref={carouselRef}
          >
            {books.map((book) => (
              <BookCard book={book} bookno={book.id} key={book.id} />
            ))}
          </Carousel>
        </AnimatePresence>
      ) : null}
    </>
  );
};

export default Slider;
