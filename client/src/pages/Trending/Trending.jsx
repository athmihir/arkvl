import React from 'react';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';
import BookDirectory from '../../components/BookDirectory/BookDirectory';
import Search from '../../components/Search/Search';

import {
  FetchTrendingBooks,
  RemoveRatedBook,
} from '../../redux/library/library.actions';
import './Trending.styles.css';

class Trending extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.props.library.length === 0) {
      this.props.fetchTrending();
    }
  }

  render() {
    const { library } = this.props;
    console.log(library);
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
          <h1> Library </h1>
          <Search />
        </div>
        {library.map((item, index) => {
          return (
            <div key={index}>
              <h2>{item.header}</h2>
              <BookDirectory
                BOOKS={item.books}
                removeRated={this.props.removeRated}
              />
            </div>
          );
        })}
      </motion.div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchTrending: () => dispatch(FetchTrendingBooks()),
  removeRated: (id) => dispatch(RemoveRatedBook(id)),
});
const mapStateToProps = (state) => ({
  library: state.library,
});

export default connect(mapStateToProps, mapDispatchToProps)(Trending);
