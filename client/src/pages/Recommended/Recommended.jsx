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
import ReactModal from 'react-modal';
import CustomButton from '../../components/CustomButton/CustomButton';

class Recommended extends Component {
  constructor(props) {
    super(props);
    this.subtitle = undefined;
    this.customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
      },
    };
    this.state = {
      modalIsOpen: false,
      verifyIsOpen: false,
      token: ((this.props.match) ? this.props.match.params.token : false),
    };
  }

  closeModal = () => {
    this.setState({
      modalIsOpen: false,
    });
    document.getElementById('blurhook').style.removeProperty('filter');
  };

  afterOpenModal() {
    document.getElementById('blurhook').style.filter = 'blur(8px)';
  }

  afterOpenVerifyModal() {
    document.getElementById('blurhook').style.filter = 'blur(8px)';
  }

  closeVerifyModal = () => {
    this.setState({
      verifyIsOpen: false,
    });
    document.getElementById('blurhook').style.removeProperty('filter');
  };

  customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
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
      }
      if (this.state.token) {
        this.setState({
          verifyIsOpen: true,
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
        id="blurhook"
      >
        <ReactModal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={this.customStyles}
          contentLabel="Example Modal"
          className="Modal"
          overlayClassName="Overlay"
        >
          <div className="emailVerifyClass">
            <h2
              className="alertHeader"
            >
              Welcome to Arkvl!
            </h2>
            <p className="alertParagraph">
              Rate your favourite books to get personalized recommendations!
            </p>
            <CustomButton style={{ margin: 'auto' }} onClick={this.closeModal}>
              Okay
            </CustomButton>
          </div>
        </ReactModal>
        {console.log(this.state.token)}
        {this.state.token.length ? (
          <ReactModal
            isOpen={this.state.verifyIsOpen}
            onAfterOpen={this.afterOpenVerifyModal}
            onRequestClose={this.closeVerifyModal}
            style={this.customStyles}
            contentLabel="Example Modal"
            className="Modal"
            overlayClassName="Overlay"
          >
            <div className="emailVerifyClass">
              <h2
                className="alertHeader"
              >
                Your Arkvl account has been successfully verified!
            </h2>
              <p className="alertParagraph">
                Have fun browsing!
            </p>
              <CustomButton style={{ margin: 'auto' }} onClick={this.closeVerifyModal}>
                Okay
            </CustomButton>
            </div>
          </ReactModal>
        ) : (
            <div></div>
          )}
        <div className="page-header">
          <h1> For You</h1>
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
