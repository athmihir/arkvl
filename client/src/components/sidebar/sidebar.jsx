/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { Link } from '@reach/router';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { ReactComponent as BookIcon } from '../../assets/icons/menu_book-24px.svg';
import { ReactComponent as LibraryIcon } from '../../assets/icons/library_icon.svg';
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
                <Logo />
              </Link>
            </h3>
          </li>

          <li className="nav-item">
            <Link
              to="/"
              getProps={({ isCurrent }) => {
                return {
                  className: isCurrent ? 'nav-link active' : 'nav-link',
                };
              }}
            >
              <BookIcon />
              <div className="link-text">For you</div>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to="/library"
              getProps={({ isCurrent }) => {
                return {
                  className: isCurrent ? 'nav-link active' : 'nav-link',
                };
              }}
            >
              <LibraryIcon />
              <div className="link-text">Library</div>
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to="/search"
              getProps={({ isCurrent }) => {
                return {
                  className: isCurrent ? 'nav-link active' : 'nav-link',
                };
              }}
            >
              <SearchIcon />
              <div className="link-text">Search</div>
            </Link>
          </li>

          <li className="nav-item">
            <span className="nav-link user-avatar">
              <Link to="/user-profile">
                <UserAvatar />
              </Link>
            </span>
          </li>
        </ul>
      </nav>
    </>
  );
};
export default SideBar;
