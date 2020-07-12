import React, { Component } from 'react';
import BookCard from '../../components/BookImage/BookImage';
import BookDetails from '../../components/BookDetails/BookDetails';
import ReactStars from 'react-rating-stars-component';
import axios from 'axios';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

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
    };
  }

  ratingChanged = (newRating) => {
    this.setState({
      rating: newRating,
    });
    axios.post(`/new-rating`, {
      rating: newRating,
      book_id: this.state.book_id,
    });
  };

  componentDidMount() {
    setTimeout(() => {
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
    }, 2000);
  }

  render() {
    return (
      <div className="book-summary-container">
        <div className="book-image-container">
          {this.state.imgSource ? (
            <BookCard imagesource={this.state.imgSource} isCover />
          ) : (
            <div className="skeletonImage">
              <SkeletonTheme
                color="var(--bg-secondary)"
                highlightColor="var(--highlight-color)"
              >
                <Skeleton height={450} width={320} />
              </SkeletonTheme>
            </div>
          )}

          <div>
            {this.state.imgSource ? (
              this.state && this.state.rating !== 0 ? (
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
              )
            ) : (
              <div className="skeletonRating">
                <SkeletonTheme
                  color="var(--bg-secondary)"
                  highlightColor="var(--highlight-color)"
                >
                  <Skeleton height={30} width={220} />
                </SkeletonTheme>
              </div>
            )}
          </div>
        </div>
        {this.state.bookTitle ? (
          <BookDetails
            booktitleis={this.state.bookTitle}
            bookauthoris={this.state.bookAuthor}
            bookgenreis={this.state.bookGenre}
            booksummary={this.state.bookDesc}
            avgRating={this.state.avgRating}
            isCover
          />
        ) : (
          <div className="skeletonDetails">
            <SkeletonTheme
              color="var(--bg-secondary)"
              highlightColor="var(--highlight-color)"
            >
              <Skeleton count={1} height={40} />
              <div className="skeletonAuthor">
                <Skeleton count={1} height={20} />
              </div>
              <div className="skeletonGenre">
                <Skeleton count={1} height={20} width={300} />
              </div>
              <div className="skeletonAbout">
                <Skeleton count={10} />
              </div>
            </SkeletonTheme>
          </div>
        )}
      </div>
    );
  }
}

export default BookSummary;
