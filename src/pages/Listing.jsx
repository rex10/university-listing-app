import React, { useState, useEffect, useMemo } from 'react';
import universityController from '../models/universityController';
import UniversityItem from '../components/UniversityItem';
import SearchBar from '../components/SearchBar';
import SortingOptions from '../components/SortingOptions';
import FilterOptions from '../components/FilterOptions';
import '../styles/listing.css';

const Listing = () => {
  // State variables
  const [universities, setUniversities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filter, setFilter] = useState('all');
  const [listView, setListView] = useState(true); // State for list/grid view

  // Fetch university data
  const fetchData = async () => {
    try {
      const data = await universityController.fetchUniversities();
      setUniversities(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle sort order change
  const handleSort = (order) => {
    setSortOrder(order);
    const sortedUniversities = universityController.sortUniversities(universities, order);
    setUniversities([...sortedUniversities]);
  };

  // Handle filter change
  const handleFilter = (filter) => {
    setFilter(filter);
  };

  // Handle delete university action
  const handleDelete = (name) => {
    const updatedUniversities = universityController.deleteUniversity(universities, name);
    setUniversities(updatedUniversities);
  };

  // Memoized list of filtered universities based on search term and filter
  const filteredUniversities = useMemo(() => {
    return universityController.filterUniversities(universities, searchTerm, filter);
  }, [universities, searchTerm, filter]);

  // Toggle between list and grid view
  const toggleView = () => {
    setListView(!listView);
  };

  return (
    <div className="listing-container">
      <h1>University Listings</h1>
      <div className="controls">
        {/* Search bar with label */}
        <div className="control-item">
          <label htmlFor="search-bar" className="control-label">Search:</label>
          <SearchBar 
            searchTerm={searchTerm}
            handleSearch={handleSearch} 
            id="search-bar"
            data-search="true" 
          />
        </div>
        {/* Sorting options with label */}
        <div className="control-item">
          <label htmlFor="sorting-options" className="control-label">Sort:</label>
          <SortingOptions 
            sortOrder={sortOrder} 
            handleSort={handleSort} 
            id="sorting-options"
            data-sort="true" 
          />
        </div>
        {/* Filter options with label */}
        <div className="control-item">
          <label htmlFor="filter-options" className="control-label">Filter:</label>
          <FilterOptions 
            filter={filter} 
            handleFilter={handleFilter} 
            id="filter-options"
            data-filter="true" 
          />
        </div>
        {/* Button to toggle between list and grid view */}
        <button className="toggle-view-btn" onClick={toggleView}>
          {listView ? 'Switch to Grid View' : 'Switch to List View'}
        </button>
      </div>
      {/* List of universities */}
      <div className={`university-list ${listView ? 'list-view' : 'grid-view'}`}>
        {filteredUniversities?.map((uni) => (
          <UniversityItem 
            key={uni.name} 
            university={uni} 
            handleDelete={handleDelete} 
          />
        ))}
      </div>
    </div>
  );
};

export default Listing;