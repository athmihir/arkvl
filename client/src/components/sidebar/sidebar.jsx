/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ReactComponent as BookIcon } from '../../assets/icons/menu_book-24px.svg';
import { ReactComponent as TrendingIcon } from '../../assets/icons/trending_up-24px.svg';
import { ReactComponent as SearchIcon } from '../../assets/icons/search-24px.svg';
import { ReactComponent as UserAvatar } from '../../assets/user.svg';
import './sidebar.styles.css';

const SideBar = () => {
  return (
    <>
      <nav className="navbar">
        <ul className="navbar-nav">
          <li className="logo">
            <h3 className="logo-link">
              <Link to="/" className="link-text logo-text">
                Arkvl
              </Link>
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
              <div className="link-text">Library</div>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/search" className="nav-link" activeClassName="active">
              <SearchIcon />
              <div className="link-text">Search</div>
            </NavLink>
          </li>

          <li className="nav-item">
            <span className="nav-link user-avatar">
              <NavLink to="/user-profile">
                <UserAvatar />
              </NavLink>
            </span>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default SideBar;
