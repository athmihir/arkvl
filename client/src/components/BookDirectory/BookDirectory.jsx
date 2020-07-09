import React from 'react';
import BookCard from '../BookCard/BookCard';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import './BookDirectory.styles.css';

export default function BookDirectory({ BOOKS, removeRated }) {
  const elements = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];
  // console.log(BOOKS);
  return (
    <div className="book-directory">
      {BOOKS && BOOKS.length > 0 ? (
        BOOKS.map((book) => (
          <ReactCSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={500}
            key={book.id}
            transitionLeaveTimeout={300}
          >
            <BookCard book={book} bookno={book.id} removeRated={removeRated} />
          </ReactCSSTransitionGroup>
        ))
      ) : (

          <div className="skeletonflex">

            {elements.map((value, index) => {
              return (
                <SkeletonTheme color="#dde2eb" highlightColor="#43474f">
                  <div className="skeletonimage">
                    <Skeleton count={1} height={300} width={200} />
                  </div>
                  <div className="skeletontitle">
                    <Skeleton count={1} height={30} width={200} />
                  </div>
                  <div className="skeletonauthor">
                    <Skeleton count={2} height={15} width={200} />
                  </div>
                </SkeletonTheme>
              )
            })}

          </div>

        )}
    </div>
  );
}
