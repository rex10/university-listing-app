import React from 'react';
import '../styles/searchBar.css';

const SearchBar = ({ searchTerm, handleSearch }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search universities"
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
