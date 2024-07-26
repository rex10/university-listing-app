"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _Dropdown = _interopRequireDefault(require("./common/Dropdown"));
const SortingOptions = _ref => {
  let {
    sortOrder,
    handleSort
  } = _ref;
  const options = [{
    value: 'asc',
    label: 'Sort Ascending'
  }, {
    value: 'desc',
    label: 'Sort Descending'
  }];
  return /*#__PURE__*/_react.default.createElement(_Dropdown.default, {
    value: sortOrder,
    options: options,
    handleChange: handleSort,
    placeholder: "Select Sorting Order"
  });
};
var _default = exports.default = SortingOptions;