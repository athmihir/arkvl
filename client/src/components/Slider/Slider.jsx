import React from 'react';
import { AnimatePresence } from 'framer-motion';
import SwiperCore, { A11y, Keyboard } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import BookCard from '../BookCard/BookCard';

SwiperCore.use([A11y, Keyboard]);

const Slider = ({ books }) => {
  return (
    <>
      {books && books.length > 0 ? (
        <AnimatePresence>
          <Swiper
            spaceBetween={50}
            slidesPerView={5}
            keyboard
            preloadImages
            centeredSlides
            a11y
            freeMode
            freeModeMomentumVelocityRatio={0.8}
            loop={books.length > 3 ? true : false}
            breakpoints={{
              100: {
                slidesPerView: 1,
              },
              320: {
                slidesPerView: 2,
                spaceBetween: 15,
              },
              // when window width is >= 480px
              480: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              // when window width is >= 640px
              640: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              900: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
              1440: {
                slidesPerView: 6,
                spaceBetween: 40,
              },
            }}
            style={{
              cursor: 'grab',
            }}
          >
            {books.map((book) => (
              <SwiperSlide key={book.id}>
                <BookCard book={book} bookno={book.id} />
              </SwiperSlide>
            ))}
          </Swiper>
        </AnimatePresence>
      ) : null}
    </>
  );
};

export default Slider;
