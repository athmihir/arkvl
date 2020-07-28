import React from 'react';
import UserDetails from '../../components/UserDetails/UserDetails';
import axios from 'axios';
import { userLogout } from '../../redux/rootreducer';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';
import './UserProfile.styles.css';
import BookDirectory from '../../components/BookDirectory/BookDirectory';
import CustomButton from '../../components/CustomButton/CustomButton';
import { withRouter } from 'react-router-dom';

class UserProfile extends React.Component {
  state = {
    booksRated: 0,
    dateJoined: '',
    favGenres: '',
    ratedBooks: [],
    username: '',
    emailSent: false,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    axios.get('/api/user-profile').then((res) => this.setState(res.data));
  }
  handleLogout = () => {
    axios.post('/api/logout').then((res) => {
      this.props.logout();
      this.props.history.push('/');
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
    console.log("entered handleverification");
    axios.get('/api/reverify');
    console.log("email sent maybe?");
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
            verified={this.state.verified}
          />
          <CustomButton onClick={this.handleLogout} small>
            Logout
          </CustomButton>
          {this.state.verified ? (
            // <img src={VerifiedSVG} alt="Verified" className="verifiedSVG" />
            <div></div>
          ) : (
              <div>
                {this.state.emailSent ? (
                  <p>ok nigga email sent</p>
                ) : (
                    <CustomButton onClick={this.handleVerification} small>
                      Verify me nigga
                    </CustomButton>
                  )}
              </div>
            )}
        </div>
        {this.state.ratedBooks.length > 0 ? (
          <div className="user-favorites">
            <h1>Books you rated</h1>
            <BookDirectory
              BOOKS={this.state.ratedBooks}
              removeOnClear={this.handleClearRating}
            />
          </div>
        ) : (
            <>
              <div>
                <h1>Books you rated</h1>

                <div className="alternateText">
                  <div className="actualQuote">
                    <p className="quote">
                      We both looked into the abyss; the only difference is you
                      blinked.
                  </p>
                    <p className="quoteauthor">
                      — Batman, <i>Crisis On Two Earths</i>
                    </p>
                  </div>
                  <p className="userMessage">
                    THE BOOKS YOU RATE WILL SHOW UP HERE
                </p>
                </div>
              </div>
            </>
          )}
      </motion.div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(userLogout()),
});

export default withRouter(connect(null, mapDispatchToProps)(UserProfile));
