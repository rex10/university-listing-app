"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _apiService = _interopRequireDefault(require("../services/apiService"));
var _localStorage = require("../utils/localStorage");
/**
 * Fetches the list of universities.
 * - First, it attempts to retrieve the data from localStorage.
 * - If no cached data is found, it fetches data from the API.
 * - Validates the data format and caches it in localStorage if valid.
 * 
 * @returns {Promise<Array>} The list of universities.
 * @throws Will throw an error if data format is invalid or an error occurs during fetch.
 */
const fetchUniversities = async () => {
  try {
    // Attempt to get data from localStorage
    const cachedData = (0, _localStorage.getFromLocalStorage)('universities');
    if (cachedData) {
      return cachedData;
    }

    // Fetch data from the API if no cached data is available
    const data = await _apiService.default.getUniversities();
    if (data && Array.isArray(data)) {
      // Cache the data in localStorage for future use
      (0, _localStorage.saveToLocalStorage)('universities', data);
      return data;
    } else {
      throw new Error('Invalid data format from API');
    }
  } catch (error) {
    console.error('Error fetching universities:', error);
    throw error;
  }
};

/**
 * Sorts the list of universities by name.
 * 
 * @param {Array} universities - The list of universities to sort.
 * @param {string} order - The sort order ('asc' for ascending, 'desc' for descending).
 * @returns {Array} The sorted list of universities.
 */
const sortUniversities = (universities, order) => {
  return universities.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (order === 'asc') {
      return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
    } else {
      return nameA > nameB ? -1 : nameA < nameB ? 1 : 0;
    }
  });
};

/**
 * Filters the list of universities based on search term and filter criteria.
 * 
 * @param {Array} universities - The list of universities to filter.
 * @param {string} searchTerm - The term to search for in university names.
 * @param {string} filter - The filter criteria ('all' for no filter or a specific category).
 * @returns {Array} The filtered list of universities.
 */
const filterUniversities = (universities, searchTerm, filter) => {
  return universities.filter(university => {
    // Check if the university name matches the search term
    const matchesSearchTerm = university.name.toLowerCase().includes(searchTerm.toLowerCase());
    // Check if the university matches the filter criteria
    const matchesFilter = filter === 'all' || university.name.toLowerCase().includes(filter.toLowerCase());
    return matchesSearchTerm && matchesFilter;
  });
};

/**
 * Deletes a university from the list and updates localStorage.
 * 
 * @param {Array} universities - The current list of universities.
 * @param {string} name - The name of the university to delete.
 * @returns {Array} The updated list of universities after deletion.
 */
const deleteUniversity = (universities, name) => {
  // Filter out the university to be deleted
  const updatedUniversities = universities.filter(university => university.name !== name);
  // Update the localStorage with the new list
  (0, _localStorage.saveToLocalStorage)('universities', updatedUniversities);
  return updatedUniversities;
};

// Export the controller object containing all functions
const universityController = {
  fetchUniversities,
  sortUniversities,
  filterUniversities,
  deleteUniversity
};
var _default = exports.default = universityController;