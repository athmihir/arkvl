import React from 'react';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';
import Slider from '../../components/Slider/Slider';

import Search from '../../components/Search/Search';

import { FetchTrendingBooks } from '../../redux/library/library.actions';
import './Library.styles.css';
import BookDirectorySkeleton from '../../components/Skeleton/skeleton';

class Trending extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.props.library.length === 0) {
      this.props.fetchTrending();
    }
  }

  render() {
    const { library } = this.props;
    return (
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={this.props.pageVariants}
        transition={this.props.pageTransition}
      >
        <div className="page-header trending-books">
          <h1> Library </h1>
        </div>
        <div className="trending-books-container">
          {library && library.length > 0 ? (
            library.map((item, index) => {
              return (
                <div key={index}>
                  <h2>{item.header}</h2>
                  <Slider books={item.books} />
                </div>
              );
            })
          ) : (
            <div className="book-directory">
              {[...Array(20)].map((value, index) => {
                return <BookDirectorySkeleton key={index} />;
              })}
            </div>
          )}
        </div>
      </motion.div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchTrending: () => dispatch(FetchTrendingBooks()),
});
const mapStateToProps = (state) => ({
  library: state.library,
});

export default connect(mapStateToProps, mapDispatchToProps)(Trending);
