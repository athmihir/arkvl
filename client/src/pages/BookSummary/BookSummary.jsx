import React, { Component } from 'react';
import { motion } from 'framer-motion';
import BookCard from '../../components/BookImage/BookImage';
import ReactStars from 'react-rating-stars-component';
import axios from 'axios';
import SummarySkeleton from '../../components/Skeleton/summarySkeleton';
import './BookSummary.styles.css';
import BookCover from '../../components/BookCover/BookCover';
import { ReactComponent as BackArrow } from '../../assets/icons/arrow_back-24px.svg';
import { isMobile } from 'react-device-detect';
import { connect } from 'react-redux';
import { RemoveRatedBook } from '../../redux/recommendations/recommendations.actions';

class BookSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book_id: this.props.bookid,
      rating: 0,
      imgSource: null,
      bookTitle: null,
      bookAuthor: null,
      bookGenre: null,
      bookDesc: null,
      avgRating: 0,
      amazonLink: '',
      isShown: false,
    };
  }

  ratingChanged = (newRating) => {
    this.setState({
      ...this.state,
      rating: newRating,
    });
    axios.post(`/api/new-rating`, {
      rating: newRating,
      book_id: this.state.book_id,
    });
    this.props.removeRated(parseInt(this.state.book_id));
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
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={this.props.pageVariants}
        transition={this.props.pageTransition}
      >
        {this.state.imgSource ? (
          <div className="book-summary-container">
            <div className="book-image-container">
              {!isMobile && (
                <button
                  onClick={() => window.history.back()}
                  className="go-back-button"
                >
                  <BackArrow />
                </button>
              )}
              <BookCard imagesource={this.state.imgSource} isCover />
              <div>
                {this.state && this.state.rating !== 0 ? (
                  <div
                    className="rating-container"
                    onMouseEnter={() =>
                      this.setState({ isShown: !this.state.isShown })
                    }
                    onMouseLeave={() =>
                      this.setState({ isShown: !this.state.isShown })
                    }
                  >
                    <span className="rating">{`${
                      this.state.isShown ? `Edit Rating` : `You Rated`
                    }`}</span>
                    <ReactStars
                      count={5}
                      size={24}
                      color2={'var(--primary-color)'}
                      className="ratingStars"
                      edit={true}
                      half={false}
                      value={this.state.rating}
                      onChange={this.ratingChanged}
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
            <BookCover
              booktitleis={this.state.bookTitle}
              bookauthoris={this.state.bookAuthor}
              bookgenreis={this.state.bookGenre}
              booksummary={this.state.bookDesc}
              avgRating={this.state.avgRating}
              amazonreadlink={this.state.amazonLink}
            />
          </div>
        ) : (
          <SummarySkeleton />
        )}
      </motion.div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  removeRated: (id) => dispatch(RemoveRatedBook(id)),
});

export default connect(null, mapDispatchToProps)(BookSummary);
