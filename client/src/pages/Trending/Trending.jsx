import React from 'react';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';
import BookDirectory from '../../components/BookDirectory/BookDirectory';
import Search from '../../components/Search/Search';

import {
  FetchTrendingBooks,
  RemoveRatedBook,
} from '../../redux/trending/trending.actions';
import './Trending.styles.css';

class Trending extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.fetchTrending();
  }

  render() {
    const { trending } = this.props;
    if (trending && trending.length > 0 && trending.length < 5) {
      this.props.fetchTrending();
    }
    return (
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={this.props.pageVariants}
        transition={this.props.pageTransition}
        className="trending-books"
      >
        <div className="page-header">
          <h1> Trending </h1>
          <Search />
        </div>
        <BookDirectory BOOKS={trending} removeRated={this.props.removeRated} />
      </motion.div>
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
