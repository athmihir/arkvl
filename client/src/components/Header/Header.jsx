import React from 'react';
import { Link, Location } from '@reach/router';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { ReactComponent as BackArrow } from '../../assets/icons/arrow_back-24px.svg';
import './Header.styles.css';

const Header = ({ isAuthenticated }) => (
  <nav className="header">
    <Location>
      {({ location }) => {
        return location.pathname.includes('book-summary') ? (
          <div className="header-container wide">
            <div className="header-logo">
              <button onClick={() => window.history.back()}>
                {isAuthenticated && (
                  <BackArrow
                    style={{
                      marginTop: '6px',
                      width: '24px',
                      marginRight: '5px',
                    }}
                  />
                )}
                <Logo />
              </button>
            </div>
          </div>
        ) : (
          <div
            className="header-container"
            style={{
              paddingLeft:
                location.pathname.includes('library') && 'calc(1em + 10px)',
            }}
          >
            <div className="header-logo">
              <Link to="/">
                <Logo />
              </Link>
            </div>
          </div>
        );
      }}
    </Location>
  </nav>
);

export default Header;
