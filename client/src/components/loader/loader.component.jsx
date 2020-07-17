import React from 'react';
import './loader.styles.css';

const Loader = () => {

  const bookQuotes = ["Get busy living or get busy dying.<br/>— Stephen King, <i>The Shawshank Redemption<i/>", "It\’s only after we\’ve lost everything that we\’re free to do anything.<br/>— Chuck Palahniuk, <i>Fight Club<i/>", "Those who don\’t believe in magic will never find it.<br/>— Roald Dahl, <i>The Minpins<i/>", "Time you enjoy wasting is not wasted time.<br/>— Marthe Troly-Curtin, <i>Phrynette Mermaid<i/>", "And, now that you don\’t have to be perfect you can be good.<br/>— John Steinbeck, <i>East of Eden<i/>", "A friend may be waiting behind a stranger\’s face.<br/>— Maya Angelou, <i>Letter To My Daughter<i/>", "Even the darkest night will end and the sun will rise.<br/>— Victor Hugo, <i>Les Misérables<i/>", "Each of us is more than the worst thing we\’ve ever done.<br/>— Bryan Stevenson, <i>Just Mercy<i/>", "There is some good in this world, and it\’s worth fighting for.<br/>— J.R.R. Tolkien, <i>The Two Towers<i/>", "Maybe ever\’body in the whole damn world is scared of each other.<br/>— John Steinbeck, <i>Of Mice And Men<i/>", "Terror made me cruel.<br/>— Emily Brontë, <i>Wuthering Heights<i/>", "It sounds plausible enough tonight, but wait until tomorrow. Wait for the common sense of the morning.<br/>— H.G. Wells, <i>The Time Machine<i/>", "We need never be ashamed of our tears.<br/>— Charles Dickens, <i>Great Expectations<i/>", "Perhaps it was freedom itself that choked her.<br/>— Patricia Highsmith, <i>The Price Of Salt<i/>"]
  const randomQuote = bookQuotes[Math.floor(Math.random() * bookQuotes.length)]

  return (
    <div className="span">
      <div>
        <div className="coffee_cup"></div>
        <h2 dangerouslySetInnerHTML={{ __html: randomQuote }}></h2>
      </div>
    </div>
  )
};

export default Loader;
