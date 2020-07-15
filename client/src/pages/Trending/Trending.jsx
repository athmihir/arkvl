import React from 'react';
import { connect } from 'react-redux';
import BookDirectory from '../../components/BookDirectory/BookDirectory';
import Search from '../../components/Search/Search';

import {
  FetchTrendingBooks,
  RemoveRatedBook,
} from '../../redux/trending/trending.actions';
import './Trending.styles.css';

class Trending extends React.Component {
  componentDidMount() {
    this.props.fetchTrending();
  }

  render() {
    const { trending } = this.props;
    if (trending && trending.length > 0 && trending.length < 5) {
      this.props.fetchTrending();
    }
    return (
      <div className="trending-books">
        <div className="page-header">
          <h1> Trending </h1>
          <Search />
        </div>
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
