import React from 'react';
import BookDirectory from '../../components/BookDirectory/BookDirectory';
import { connect } from 'react-redux';

import {
  FetchTrendingBooks,
  RemoveRatedBook,
} from '../../redux/trending/trending.actions';
import './Trending.styles.css';

class Trending extends React.Component {
  componentWillMount() {
    this.props.fetchTrending();
  }

  render() {
    const { trending } = this.props;
    return (
      <div className="trending-books">
        <h1>Trending.</h1>
        <BookDirectory BOOKS={trending} removeRated={this.props.removeRated} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchTrending: () => dispatch(FetchTrendingBooks()),
  removeRated: (id) => dispatch(RemoveRatedBook(id)),
});
const mapStateToProps = (state) => ({
  trending: state.trending,
});

export default connect(mapStateToProps, mapDispatchToProps)(Trending);
