import React, { Component } from 'react';
import BookCard from '../../components/BookImage/BookImage';
import BookDetails from '../../components/BookDetails/BookDetails';
import ReactStars from 'react-rating-stars-component';
import axios from 'axios';

import './BookSummary.styles.css';

class BookSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book_id: this.props.match.params.bookid,
      rating: 0,
      imgSource: '',
      bookTitle: '',
      bookAuthor: '',
      bookGenre: '',
      bookDesc: '',
      avgRating: 0,
    };
  }

  ratingChanged = (newRating) => {
    axios
      .post(`/new-rating`, {
        rating: newRating,
        book_id: this.state.book_id,
      })
      .then((res) =>
        this.setState({
          rating: newRating,
        }),
      );
  };

  componentDidMount() {
    axios
      .post('/Summary', {
        book_id: this.state.book_id,
      })
      .then((res) => {
        console.log(res.data.Summary);
        this.setState({
          bookAuthor: res.data.Summary[0].author,
          imgSource: res.data.Summary[0].image_url,
          bookTitle: res.data.Summary[0].title,
          bookGenre: res.data.Summary[0].genres,
          bookDesc: res.data.Summary[0].description,
          avgRating: res.data.Summary[0].average_rating,
          rating: res.data.Summary[0].read_or_not,
        });
      });
  }

  render() {
    return (
      <div className="book-summary-container">
        <div className="book-image-container">
          <BookCard imagesource={this.state.imgSource} isCover />
          <div>
            {this.state && this.state.rating !== 0 ? (
              <div className="rating-container">
                <span className="rating">You Rated</span>
                <ReactStars
                  count={5}
                  size={24}
                  color2={'var(--primary-color)'}
                  className="ratingStars"
                  edit={false}
                  value={this.state.rating}
                />
              </div>
            ) : (
              <div className="rating-container">
                <h3 className="rating">Rate this book</h3>
                <ReactStars
                  count={5}
                  size={24}
                  color2={'var(--primary-color)'}
                  className="ratingStars"
                  onChange={this.ratingChanged}
                  half={false}
                />
              </div>
            )}
          </div>
        </div>
        <BookDetails
          booktitleis={this.state.bookTitle}
          bookauthoris={this.state.bookAuthor}
          bookgenreis={this.state.bookGenre}
          booksummary={this.state.bookDesc}
          avgRating={this.state.avgRating}
          isCover
        />
      </div>
    );
  }
}

export default BookSummary;
