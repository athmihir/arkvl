import React, { useState, Component } from 'react';
import BookCard from '../../components/BookImage/BookImage';
import BookDetails from '../../components/BookDetails/BookDetails';
import ReactStars from 'react-rating-stars-component';
import SINGLEBOOK from '../../shared/singleBookDetail';
import axios from 'axios';

import './BookSummary.styles.css';

class BookSummary extends Component {

  constructor(props) {
    super(props);
    console.log("guys wtf props follows this text");
    console.log(this.props.match.params.bookid);
    this.state = {
      book_id: this.props.match.params.bookid,
      rating: 0,
      imgSource: '',
      bookTitle: '',
      bookAuthor: '',
      bookGenre: '',
      bookDesc: '',
    }
  }

  ratingChanged = (newRating) => {
    this.setState(newRating);
  };

  componentDidMount() {
    axios.post('/Summary', {
      book_id: this.state.book_id
    })
      .then((res) => {
        console.log("here is the res stuff");
        console.log(res);
        this.setState({
          bookAuthor: res.data.author,
          imgSource: res.data.image_url,
          bookTitle: res.data.title,
          bookGenre: res.data.genres,
          bookDesc: res.data.description
        })
      })
  }


  render() {
    { console.log(this.props.match.params.bookid) }
    return (
      <div className="book-summary-container" >
        <div className="book-image-container">
          <BookCard imagesource={this.state.imgSource} isCover />
          <div>
            {SINGLEBOOK.userRating ? (
              <div className="rating-container">
                <span className="rating">You Rated</span>
                <ReactStars
                  count={5}
                  size={24}
                  color2={'var(--primary-color)'}
                  className="ratingStars"
                  edit={false}
                  value={SINGLEBOOK.userRating}
                />
              </div>
            ) : (
                <div className="rating-container">
                  <h3 className="rating">Rate Now</h3>
                  <ReactStars
                    count={5}
                    size={24}
                    color2={'var(--primary-color)'}
                    className="ratingStars"
                    onChange={this.ratingChanged}
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
          avgRating={SINGLEBOOK.avgRating}
          isCover
        />
      </div>
    );
  }
}

export default BookSummary;
