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
import Modal from '../../components/Modal/Modal';

class Recommended extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      verifyIsOpen: false,
      token: this.props.match ? this.props.match.params.token : false,
    };
  }

  closeModal = () => {
    console.log("kanyewest")
    this.setState({
      modalIsOpen: false,
    });
    document.getElementById('blurhook').style.removeProperty('filter');
  };

  closeVerifyModal = () => {
    this.setState({
      verifyIsOpen: false,
    });
    document.getElementById('blurhook').style.removeProperty('filter');
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.props.loadRecs && this.props.loadRecs.length === 0) {
      console.log('Hello');
      this.props.fetchedBooks();
      if (this.props.newUser) {
        this.setState({
          modalIsOpen: true,
        });
        console.log("nigga do we have a problem?")
        document.getElementById('blurhook').style.filter = 'blur(8px)';
      }
      if (this.state.token) {
        this.setState({
          verifyIsOpen: true,
        });
        document.getElementById('blurhook').style.filter = 'blur(8px)';
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
        <Modal modalIsOpen={this.state.modalIsOpen} closeModal={this.closeModal} verifymodal={false} />
        {
          this.state.token.length ? (
            <Modal modalIsOpen={this.state.verifyIsOpen} closeModal={this.closeVerifyModal} verifymodal={true} />
          ) : (
              null
            )
        }
        <div id="blurhook">
          <div className="page-header">
            <h1> For You</h1>
          </div>
          <BookDirectory
            BOOKS={this.props.loadRecs}
            removeRated={this.props.removeRated}
          />
        </div>
      </motion.div >
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
