import React from 'react';
import UserDetails from '../../components/UserDetails/UserDetails';
import axios from 'axios';

import './UserProfile.styles.css';
import BookDirectory from '../../components/BookDirectory/BookDirectory';

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

  render() {
    console.log(this.state);
    return (
      <div className="user-profile-page">
        <UserDetails
          booksRated={this.state.booksRated}
          dateJoined={this.state.dateJoined}
          favGenres={this.state.favGenres}
          username={this.state.username}
        />
        <div className="user-favorites">
          <h1>Your Favorites.</h1>
          <BookDirectory BOOKS={this.state.ratedBooks} />
        </div>
      </div>
    );
  }
}

export default UserProfile;
