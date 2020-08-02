import React from 'react';
import './loader.styles.css';

const Loader = () => {
  const bookQuotes = [
    `<div style = "font-size: 19px;
  letter-spacing: 1px;
  line-height: 2;">"Get busy living or get busy dying."<br/>— Stephen King, <i>The Shawshank Redemption<i/></div>`,
    `<div style = "font-size: 19px;
  letter-spacing: 1px;
  line-height: 2;">"It’s only after we’ve lost everything that we’re free to do anything."<br/>— Chuck Palahniuk, <i>Fight Club<i/></div>`,
    `<div style = "font-size: 19px;
  letter-spacing: 1px;
  line-height: 2;">"Those who don’t believe in magic will never find it."<br/>— Roald Dahl, <i>The Minpins<i/></div>`,
    `<div style = "font-size: 19px;
  letter-spacing: 1px;
  line-height: 2;">"Time you enjoy wasting is not wasted time."<br/>— Marthe Troly-Curtin, <i>Phrynette Mermaid<i/></div>`,
    `<div style = "font-size: 19px;
  letter-spacing: 1px;
  line-height: 2;">"And, now that you don’t have to be perfect you can be good."<br/>— John Steinbeck, <i>East of Eden<i/></div>`,
    `<div style = "font-size: 19px;
  letter-spacing: 1px;
  line-height: 2;">"A friend may be waiting behind a stranger’s face."<br/>— Maya Angelou, <i>Letter To My Daughter<i/></div>`,
    `<div style = "font-size: 19px;
  letter-spacing: 1px;
  line-height: 2;">"Even the darkest night will end and the sun will rise."<br/>— Victor Hugo, <i>Les Misérables<i/></div>`,
    `<div style = "font-size: 19px;
  letter-spacing: 1px;
  line-height: 2;">"Each of us is more than the worst thing we’ve ever done."<br/>— Bryan Stevenson, <i>Just Mercy<i/></div>`,
    `<div style = "font-size: 19px;
  letter-spacing: 1px;
  line-height: 2;">"There is some good in this world, and it’s worth fighting for."<br/>— J.R.R. Tolkien, <i>The Two Towers<i/></div>`,
    `<div style = "font-size: 19px;
  letter-spacing: 1px;
  line-height: 2;">"Maybe ever’body in the whole damn world is scared of each other."<br/>— John Steinbeck, <i>Of Mice And Men<i/></div>`,
    `<div style = "font-size: 19px;
  letter-spacing: 1px;
  line-height: 2;">"Terror made me cruel."<br/>— Emily Brontë, <i>Wuthering Heights<i/></div>`,
    `<div style = "font-size: 19px;
  letter-spacing: 1px;
  line-height: 2;">"It sounds plausible enough tonight, but wait until tomorrow. Wait for the common sense of the morning."<br/>— H.G. Wells, <i>The Time Machine<i/></div>`,
    `<div style = "font-size: 19px;
  letter-spacing: 1px;
  line-height: 2;">"We need never be ashamed of our tears."<br/>— Charles Dickens, <i>Great Expectations<i/></div>`,
    `<div style = "font-size: 19px;
  letter-spacing: 1px;
  line-height: 2;">"Perhaps it was freedom itself that choked her."<br/>— Patricia Highsmith, <i>The Price Of Salt<i/></div>`,
    `<div style = "font-size: 19px;
  letter-spacing: 1px;
  line-height: 2;">"We both looked into the abyss; the only difference is you blinked."<br/>— Batman, <i>Crisis On Two Earths<i/></div>`,
  ];
  const randomQuote = bookQuotes[Math.floor(Math.random() * bookQuotes.length)];

  return (
    <div className="span">
      <div>
        <div className="coffee_cup"></div>
        <div dangerouslySetInnerHTML={{ __html: randomQuote }}></div>
      </div>
    </div>
  );
};

export default Loader;
