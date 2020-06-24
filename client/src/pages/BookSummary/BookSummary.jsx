import React from 'react';
import BookCard from '../../components/BookImage/BookImage';
import BookDetails from '../../components/BookDetails/BookDetails';
import SINGLEBOOK from '../../shared/singleBookDetail';
import './BookSummary.styles.css';

function BookSummary() {
  return (
    <div className="book-summary-container">
      <BookCard imagesource={SINGLEBOOK.image} isCover />
      <BookDetails
        booktitleis={SINGLEBOOK.title}
        bookauthoris={SINGLEBOOK.author}
        bookgenreis={SINGLEBOOK.bookgenre}
        booksummary={SINGLEBOOK.bookdescription}
        isCover
      />
    </div>
  );
}

export default BookSummary;
