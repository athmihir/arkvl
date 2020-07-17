import React from 'react';
import BookDirectory from '../../components/BookDirectory/BookDirectory';
import './Recommended.styles.css';
import {
  fetchRecommendationsUser,
  RemoveRatedBook,
} from '../../redux/recommendations/recommendations.actions';
import { Component } from 'react';
import { connect } from 'react-redux';
import { toast, Slide } from 'react-toastify';
import { motion } from 'framer-motion';
import Search from '../../components/Search/Search';

class Recommended extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.props.loadRecs && this.props.loadRecs.length === 0) {
      this.props.fetchedBooks();
      if (this.props.newUser) {
        toast('Rate books to get recommendations curated for you.', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Slide,
        });
      }
    }
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
  newUser: state.user.newUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(Recommended);
