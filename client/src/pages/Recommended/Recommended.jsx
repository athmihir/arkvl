import React from 'react';
import BookDirectory from '../../components/BookDirectory/BookDirectory';
import './Recommended.styles.css';
import { fetchRecommendationsUser } from '../../redux/recommendations/recommendations.actions'
import { Component } from 'react';
import { connect } from 'react-redux';

class Recommended extends Component {
  constructor(props) {
    super(props);
    props.fetchedBooks();
  }

  render() {
    return (
      <div className="recommended-books">
        <h1> For You.</h1>
        <BookDirectory BOOKS={this.props.loadRecs} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchedBooks: () => dispatch(fetchRecommendationsUser()),
});

const mapStateToProps = (state) => ({
  loadRecs: state.recommendations
})

export default connect(mapStateToProps, mapDispatchToProps)(Recommended);