import React from 'react';
import BookDirectory from '../../components/BookDirectory/BookDirectory';
import './Recommended.styles.css';
import {
  fetchRecommendationsUser,
  RemoveRatedBook,
} from '../../redux/recommendations/recommendations.actions';
import { Component } from 'react';
import { connect } from 'react-redux';

class Recommended extends Component {
  // componentWillMount() {
  //   this.props.fetchedBooks();
  // }

  componentDidMount() {
    setTimeout(() => {
      this.props.fetchedBooks();
    }, 2000)
  }

  render() {
    return (
      <div className="recommended-books">
        <h1> For You.</h1>
        <BookDirectory
          BOOKS={this.props.loadRecs}
          removeRated={this.props.removeRated}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchedBooks: () => dispatch(fetchRecommendationsUser()),
  removeRated: (id) => dispatch(RemoveRatedBook(id)),
});

const mapStateToProps = (state) => ({
  loadRecs: state.recommendations,
});

export default connect(mapStateToProps, mapDispatchToProps)(Recommended);
