"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _Dropdown = _interopRequireDefault(require("./common/Dropdown"));
const FilterOptions = _ref => {
  let {
    filter,
    handleFilter
  } = _ref;
  const options = [{
    value: 'all',
    label: 'All'
  }, {
    value: 'college',
    label: 'College'
  }, {
    value: 'institute',
    label: 'Institute'
  }, {
    value: 'university',
    label: 'University'
  }];
  return /*#__PURE__*/_react.default.createElement(_Dropdown.default, {
    value: filter,
    options: options,
    handleChange: handleFilter,
    placeholder: "Select Filter"
  });
};
var _default = exports.default = FilterOptions;