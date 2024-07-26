"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
require("../../styles/common/dropdown.css");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const Dropdown = _ref => {
  let {
    value,
    options,
    handleChange,
    placeholder
  } = _ref;
  const [isOpen, setIsOpen] = (0, _react.useState)(false);
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  const handleSelectChange = e => {
    handleChange(e.target.value);
    setIsOpen(false); // Close dropdown on selection
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "dropdown ".concat(isOpen ? 'open' : ''),
    "data-dropdown": "true"
  }, /*#__PURE__*/_react.default.createElement("select", {
    value: value,
    onChange: handleSelectChange,
    onClick: toggleOpen,
    onBlur: () => setIsOpen(false) // Close dropdown when it loses focus
  }, placeholder && /*#__PURE__*/_react.default.createElement("option", {
    value: "",
    disabled: true
  }, placeholder), options.map((option, index) => /*#__PURE__*/_react.default.createElement("option", {
    key: index,
    value: option.value
  }, option.label))));
};
var _default = exports.default = Dropdown;