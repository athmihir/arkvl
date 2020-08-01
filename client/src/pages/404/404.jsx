import React from 'react';
import { Component } from 'react';
import { motion } from 'framer-motion';
import { Link } from '@reach/router';
import './404.styles.css';

class Error404 extends Component {
  render() {
    return (
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={this.props.pageVariants}
        transition={this.props.pageTransition}
        className="errorContainer"
      >
        <div className="errorHeader">
          <h1>404</h1>
          <p className="pageNotFoundStyle">PAGE NOT FOUND</p>
        </div>

        <div className="errorBody">
          <p>
            "We should start back," Gared urged as the woods began to grow dark
            around them. "The website is dead."
          </p>
          <p>
            "Do 404 pages frighten you?" Ser Waymar Royce asked with just the
            hint of a smile.
          </p>
          <p>
            Gared did not rise to the bait. He knew they had to get to the south
            of The Wall before they were butchered.
          </p>
        </div>

        <div className="errorFooter">
          <Link to="/">Get back to safety.</Link>
        </div>
      </motion.div>
    );
  }
}

export default Error404;
