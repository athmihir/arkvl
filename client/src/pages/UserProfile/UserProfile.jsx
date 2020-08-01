import React from 'react';
import UserDetails from '../../components/UserDetails/UserDetails';
import axios from 'axios';
import { userLogout } from '../../redux/rootreducer';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';
import './UserProfile.styles.css';
import BookDirectory from '../../components/BookDirectory/BookDirectory';
import CustomButton from '../../components/CustomButton/CustomButton';
import { navigate } from '@reach/router';

class UserProfile extends React.Component {
  state = {
    booksRated: 0,
    dateJoined: '',
    favGenres: '',
    ratedBooks: [],
    username: '',
    emailSent: false,
    verified: undefined,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    axios.get('/api/user-profile').then((res) => this.setState(res.data));
  }
  handleLogout = () => {
    axios.post('/api/logout').then((res) => {
      this.props.logout();
      navigate('/');
    });
  };
  handleClearRating = (id) => {
    let delList = this.state.ratedBooks;
    delList = delList.filter((item) => item.id !== id);
    this.setState({
      ...this.state,
      ratedBooks: delList,
    });
  };
  handleVerification = () => {
    console.log('entered handleverification');
    axios.get('/api/reverify');
    console.log('email sent maybe?');
    this.setState({
      ...this.state,
      emailSent: true,
    });
  };
  render() {
    console.log(this.state);
    return (
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={this.props.pageVariants}
        transition={this.props.pageTransition}
        className="user-profile-page"
      >
        <div className="user-page-header">
          <UserDetails
            booksRated={this.state.booksRated}
            dateJoined={this.state.dateJoined}
            favGenres={this.state.favGenres}
            username={this.state.username}
          />
          {this.state.username ? (
            <CustomButton onClick={this.handleLogout} small>
              Logout
            </CustomButton>
          ) : null}
          {this.state.verified === undefined ||
          this.state.verified === true ? null : (
            <div>
              {this.state.emailSent ? (
                <p style={{ marginLeft: '10px', marginTop: '5px' }}>
                  We've sent you an email!
                </p>
              ) : (
                <CustomButton
                  onClick={this.handleVerification}
                  link
                  style={{ marginLeft: '10px', marginTop: '13px' }}
                >
                  Verify my account
                </CustomButton>
              )}
            </div>
          )}
        </div>
        <div className="user-favorites">
          <>
            <h1>Books you rated</h1>
            {this.state.ratedBooks.length > 0 ? (
              <BookDirectory
                BOOKS={this.state.ratedBooks}
                removeOnClear={this.handleClearRating}
              />
            ) : (
              <>
                <div className="alternateText">
                  <p className="userMessage">
                    THE BOOKS YOU RATE WILL SHOW UP HERE
                  </p>
                </div>
              </>
            )}
          </>
        </div>
      </motion.div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(userLogout()),
});

export default connect(null, mapDispatchToProps)(UserProfile);
