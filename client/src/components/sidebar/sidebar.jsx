/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';

import { NavLink } from 'react-router-dom';
import { ReactComponent as BookIcon } from '../../assets/icons/menu_book-24px.svg';
import { ReactComponent as TrendingIcon } from '../../assets/icons/trending_up-24px.svg';
import { ReactComponent as ClipBoardIcon } from '../../assets/icons/content_paste-24px.svg';
import { ReactComponent as ChevronIcon } from '../../assets/icons/ArrowPointer.svg';
import { ReactComponent as UserAvatar } from '../../assets/useravatar.svg';
import './sidebar.styles.css';

const SideBar = () => {
  const [open, setOpen] = useState(false);
  const toggleMenu = () => setOpen(!open);
  return (
    <>
      <nav className={`navbar ${open ? 'open' : ''}`}>
        <ul className="navbar-nav">
          <li className="logo">
            <h3 className="logo-link" onClick={toggleMenu}>
              <span className="link-text logo-text">Reco</span>
              <ChevronIcon />
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
            <span className="nav-link">
              <ClipBoardIcon />
              <div className="link-text">Categories</div>
            </span>
          </li>

          <li className="nav-item">
            <span className="nav-link user-avatar">
              <UserAvatar onClick={toggleMenu} />
              <div className="link-text">
                <span className="user-name">SkARfaCE</span>
                <NavLink to="/user-profile" className="user-username">
                  @scarface
                </NavLink>
                <span className="user-logout">logout</span>
              </div>
            </span>
          </li>
        </ul>
      </nav>
      <div className="hand-held-menu">
        <span className="user-name">SkARfaCE</span>
        <NavLink to="/user-profile" className="user-username">
          @scarface
        </NavLink>
        <span className="user-logout">logout</span>
      </div>
    </>
  );
};
export default SideBar;
