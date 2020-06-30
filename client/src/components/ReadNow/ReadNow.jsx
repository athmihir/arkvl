import React from 'react';

const ReadNowComponent = ({ amazonreadlink }) => (
  <p className="readnowp">
    <a className="anchorcss" href={amazonreadlink}>
      Read Now
    </a>
  </p>
);

export default ReadNowComponent;
