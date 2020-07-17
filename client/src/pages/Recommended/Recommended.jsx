import React from 'react';
import BookDirectory from '../../components/BookDirectory/BookDirectory';
import './Recommended.styles.css';
import {
  fetchRecommendationsUser,
  RemoveRatedBook,
} from '../../redux/recommendations/recommendations.actions';
import { Component } from 'react';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';
import Search from '../../components/Search/Search';

class Recommended extends Component {
  constructor(props) {
    super(props);
    props.fetchedBooks();
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    if (
      this.props.loadRecs &&
      this.props.loadRecs.length > 0 &&
      this.props.loadRecs.length < 5
    ) {
      this.props.fetchedBooks();
    }
    return (
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={this.props.pageVariants}
        transition={this.props.pageTransition}
        className="recommended-books"
      >
        <div className="page-header">
          <h1> For You</h1>
          <Search />
        </div>
        <BookDirectory
          BOOKS={this.props.loadRecs}
          removeRated={this.props.removeRated}
        />
      </motion.div>
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
