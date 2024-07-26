"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _universityController = _interopRequireDefault(require("../models/universityController"));
var _UniversityItem = _interopRequireDefault(require("../components/UniversityItem"));
var _SearchBar = _interopRequireDefault(require("../components/SearchBar"));
var _SortingOptions = _interopRequireDefault(require("../components/SortingOptions"));
var _FilterOptions = _interopRequireDefault(require("../components/FilterOptions"));
require("../styles/listing.css");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const Listing = () => {
  // State variables
  const [universities, setUniversities] = (0, _react.useState)([]);
  const [searchTerm, setSearchTerm] = (0, _react.useState)('');
  const [sortOrder, setSortOrder] = (0, _react.useState)('asc');
  const [filter, setFilter] = (0, _react.useState)('all');
  const [listView, setListView] = (0, _react.useState)(true); // State for list/grid view

  // Fetch university data
  const fetchData = async () => {
    try {
      const data = await _universityController.default.fetchUniversities();
      setUniversities(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch data on component mount
  (0, _react.useEffect)(() => {
    fetchData();
  }, []);

  // Handle search input change
  const handleSearch = e => {
    setSearchTerm(e.target.value);
  };

  // Handle sort order change
  const handleSort = order => {
    setSortOrder(order);
    const sortedUniversities = _universityController.default.sortUniversities(universities, order);
    setUniversities([...sortedUniversities]);
  };

  // Handle filter change
  const handleFilter = filter => {
    setFilter(filter);
  };

  // Handle delete university action
  const handleDelete = name => {
    const updatedUniversities = _universityController.default.deleteUniversity(universities, name);
    setUniversities(updatedUniversities);
  };

  // Memoized list of filtered universities based on search term and filter
  const filteredUniversities = (0, _react.useMemo)(() => {
    return _universityController.default.filterUniversities(universities, searchTerm, filter);
  }, [universities, searchTerm, filter]);

  // Toggle between list and grid view
  const toggleView = () => {
    setListView(!listView);
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "listing-container"
  }, /*#__PURE__*/_react.default.createElement("h1", null, "University Listings"), /*#__PURE__*/_react.default.createElement("div", {
    className: "controls"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "control-item"
  }, /*#__PURE__*/_react.default.createElement("label", {
    for: "search-bar",
    className: "control-label"
  }, "Search:"), /*#__PURE__*/_react.default.createElement(_SearchBar.default, {
    searchTerm: searchTerm,
    handleSearch: handleSearch,
    id: "search-bar",
    "data-search": "true"
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "control-item"
  }, /*#__PURE__*/_react.default.createElement("label", {
    for: "sorting-options",
    className: "control-label"
  }, "Sort:"), /*#__PURE__*/_react.default.createElement(_SortingOptions.default, {
    sortOrder: sortOrder,
    handleSort: handleSort,
    id: "sorting-options",
    "data-sort": "true"
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "control-item"
  }, /*#__PURE__*/_react.default.createElement("label", {
    for: "filter-options",
    className: "control-label"
  }, "Filter:"), /*#__PURE__*/_react.default.createElement(_FilterOptions.default, {
    filter: filter,
    handleFilter: handleFilter,
    id: "filter-options",
    "data-filter": "true"
  })), /*#__PURE__*/_react.default.createElement("button", {
    className: "toggle-view-btn",
    onClick: toggleView
  }, listView ? 'Switch to Grid View' : 'Switch to List View')), /*#__PURE__*/_react.default.createElement("div", {
    className: "university-list ".concat(listView ? 'list-view' : 'grid-view')
  }, filteredUniversities.map(uni => /*#__PURE__*/_react.default.createElement(_UniversityItem.default, {
    key: uni.name,
    university: uni,
    handleDelete: handleDelete
  }))));
};
var _default = exports.default = Listing;