import React from 'react';
import AsyncSelect from 'react-select/async';
import { components } from 'react-select';
import _ from 'lodash';
import makeAnimated from 'react-select/animated';

import axios from 'axios';
import { Link } from '@reach/router';

const animatedComponents = makeAnimated();

const formatOptionLabel = ({ value, label, image, author }) => (
  <Link style={{ textDecoration: 'none' }} to={`/book-summary/${value}`}>
    <div style={{ display: 'flex' }}>
      <img src={image} alt="BookImage" width="40px" />
      <div style={{ marginLeft: '10px', color: 'var(--primary-text)' }}>
        {label}
        <br />
        <span style={{ fontSize: '0.8em', color: 'var( --secondary-text)' }}>
          {' '}
          {author}{' '}
        </span>
      </div>
    </div>
  </Link>
);
const SearchIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      width="15"
      fill="var(--primary-text)"
    >
      <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
    </svg>
  );
};

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <SearchIcon />
    </components.DropdownIndicator>
  );
};

class Search extends React.Component {
  state = {
    inputValue: '',
  };

  loadOptions = (inputText, callback) => {
    this.setState({
      inputValue: inputText,
    });
    axios.get(`/api/search/${inputText}`).then((res) => {
      console.log(res.data);
      callback(
        res.data.searchResults.map((book) => ({
          label: book.title,
          value: book.book_id,
          image: book.image_url,
          author: book.author,
        })),
      );
    });
  };
  wait = 1000; // milliseconds
  debouncedLoadOptions = _.debounce(this.loadOptions, this.wait);
  render() {
    const customStyles = {
      menuList: this.props.large
        ? (base, state) => ({
            ...base,
            minHeight: this.state.inputValue.length !== 0 ? '70vh' : '',
          })
        : (base) => ({
            ...base,
          }),
    };

    return (
      <AsyncSelect
        components={{ animatedComponents, DropdownIndicator }}
        noOptionsMessage={() =>
          this.state.inputValue.length !== 0
            ? 'No such books found'
            : 'Search for a book'
        }
        loadOptions={this.debouncedLoadOptions}
        placeholder="Search"
        value={this.state.inputValue}
        formatOptionLabel={formatOptionLabel}
        width="500px"
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            primary25: 'var(--primary-color)',
            primary: 'var(--secondary-text)',
            neutral0: 'var( --bg-primary)',
            neutral80: 'var(--primary-text)',
            primary50: 'var(--bg-secondary)',
            neutral10: 'var(--light-gray)',
          },
        })}
        styles={customStyles}
      />
    );
  }
}

export default Search;
