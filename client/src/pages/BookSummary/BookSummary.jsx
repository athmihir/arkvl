import React, { Component } from 'react';
import BookCard from '../../components/BookImage/BookImage';
import BookDetails from '../../components/BookDetails/BookDetails';
import ReactStars from 'react-rating-stars-component';
import axios from 'axios';
import SummarySkeleton from '../../components/Skeleton/summarySkeleton';
import './BookSummary.styles.css';

class BookSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book_id: this.props.match.params.bookid,
      rating: 0,
      imgSource: null,
      bookTitle: null,
      bookAuthor: null,
      bookGenre: null,
      bookDesc: null,
      avgRating: 0,
      amazonLink: '',
    };
  }

  ratingChanged = (newRating) => {
    this.setState({
      rating: newRating,
    });
    axios.post(`/api/new-rating`, {
      rating: newRating,
      book_id: this.state.book_id,
    });
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    axios
      .post('/api/summary', {
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
          amazonLink: res.data.Summary[0].amazonLink,
        });
      });
  }

  render() {
    return (
      <div>
        {this.state.imgSource ? (
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
                      half={false}
                      value={this.state.rating}
                    />
                  </div>
                ) : (
                  <div className="rating-container">
                    <p className="rating">Rate this book</p>
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
              amazonreadlink={this.state.amazonLink}
              isCover
            />
          </div>
        ) : (
          <SummarySkeleton />
        )}
      </div>
    );
  }
}

export default BookSummary;
