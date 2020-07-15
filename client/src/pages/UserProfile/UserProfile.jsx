import React from 'react';
import UserDetails from '../../components/UserDetails/UserDetails';
import axios from 'axios';
import { userLogout } from '../../redux/rootreducer';
import { connect } from 'react-redux';
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
  };

  componentDidMount() {
    axios.get('/api/user-profile').then((res) => this.setState(res.data));
  }
  handleLogout = () => {
    axios.post('/api/logout').then((res) => {
      this.props.logout();
      this.props.history.push('/');
    });
  };
  render() {
    console.log(this.state);
    return (
      <div className="user-profile-page">
        <div className="user-page-header">
          <UserDetails
            booksRated={this.state.booksRated}
            dateJoined={this.state.dateJoined}
            favGenres={this.state.favGenres}
            username={this.state.username}
          />
          <CustomButton onClick={this.handleLogout} small>
            Logout
          </CustomButton>
        </div>
        <div className="user-favorites">
          <h1>Your Favorites</h1>
          <BookDirectory BOOKS={this.state.ratedBooks} />
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(userLogout()),
});

export default withRouter(connect(null, mapDispatchToProps)(UserProfile));
