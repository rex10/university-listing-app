"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
require("../styles/searchBar.css");
const SearchBar = _ref => {
  let {
    searchTerm,
    handleSearch
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "search-bar"
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    placeholder: "Search universities",
    value: searchTerm,
    onChange: handleSearch
  }));
};
var _default = exports.default = SearchBar;