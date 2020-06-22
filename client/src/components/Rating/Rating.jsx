import React, { Component } from 'react';
import './Rating.styles.css';

class StarRatingComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="rating">
        <input name="stars" id="e5" type="radio" />
        <a />
        <label for="e5">☆</label>
        <input name="stars" id="e4" type="radio" />
        <a />
        <label for="e4">☆</label>
        <input name="stars" id="e3" type="radio" />
        <a />
        <label for="e3">☆</label>
        <input name="stars" id="e2" type="radio" />
        <a />
        <label for="e2">☆</label>
        <input name="stars" id="e1" type="radio" />
        <a />
        <label for="e1">☆</label>
      </div>
    );
  }
}

export default StarRatingComponent;
