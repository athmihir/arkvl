import React from 'react';
import BookDirectory from '../../components/BookDirectory/BookDirectory';
import './Recommended.styles.css';
import { fetchRecommendationsUser } from '../../redux/recommendations/recommendations.actions'
import { Component } from 'react';
import { connect } from 'react-redux';

class Recommended extends Component {
  componentWillMount() {
    console.log("Checking this.props.fetchedBooks()")
    console.log(this.props.fetchedBooks())
    this.props.fetchedBooks();
  }

  render() {
    console.log("DAMN LESS GOOOOO")
    console.log(this.props.loadRecs)
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