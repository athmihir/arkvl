import React from 'react';
import BookDirectory from '../../components/BookDirectory/BookDirectory';
import { connect } from 'react-redux';

import { FetchTrendingBooks } from '../../redux/trending/trending.actions';
import './Trending.styles.css';

class Trending extends React.Component {
  constructor(props) {
    super(props);
    props.fetchTrending();
  }

  render() {
    return (
      <div className="trending-books">
        <h1>Trending.</h1>
        <BookDirectory />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchTrending: () => dispatch(FetchTrendingBooks()),
});

export default connect(null, mapDispatchToProps)(Trending);
