/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { NavLink, Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import { ReactComponent as BookIcon } from '../../assets/icons/menu_book-24px.svg';
import { ReactComponent as TrendingIcon } from '../../assets/icons/trending_up-24px.svg';
import { ReactComponent as ChevronIcon } from '../../assets/icons/ArrowPointer.svg';
import { ReactComponent as UserAvatar } from '../../assets/user.svg';
import { userLogout } from '../../redux/rootreducer';
import './sidebar.styles.css';

const SideBar = ({ userName, logout, history }) => {
  const handleLogout = () => {
    axios.post('/api/logout').then((res) => {
      logout();
      history.push('/');
    });
  };
  const [open, setOpen] = useState(false);
  const toggleMenu = () => setOpen(!open);
  return (
    <>
      <nav className={`navbar ${open ? 'open' : ''}`}>
        <ul className="navbar-nav">
          <li className="logo">
            <h3 className="logo-link">
              <Link to="/" className="link-text logo-text">
                Reco
              </Link>
              <ChevronIcon onClick={toggleMenu} />
            </h3>
          </li>

          <li className="nav-item">
            <NavLink exact to="/" className="nav-link" activeClassName="active">
              <BookIcon />
              <div className="link-text">For you</div>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/trending"
              className="nav-link"
              activeClassName="active"
            >
              <TrendingIcon />
              <div className="link-text">Trending</div>
            </NavLink>
          </li>

          <li className="nav-item">
            <span className="nav-link user-avatar">
              <UserAvatar onClick={toggleMenu} />
              <div className="link-text">
                <NavLink to="/user-profile" className="user-username">
                  {userName}
                </NavLink>
                <button className="user-logout" onClick={handleLogout}>
                  logout
                </button>
              </div>
            </span>
          </li>
        </ul>
      </nav>
      <div className="hand-held-menu">
        <Link to="/user-profile" className="user-username">
          {userName}
        </Link>
        <button className="user-logout" onClick={handleLogout}>
          logout
        </button>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  userName: state.user.userName,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(userLogout()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SideBar),
);
