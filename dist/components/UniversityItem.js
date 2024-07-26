"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
require("../styles/universityItem.css");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const UniversityItem = _ref => {
  let {
    university,
    handleDelete
  } = _ref;
  const [isDeleting, setIsDeleting] = (0, _react.useState)(false);
  const handleClickDelete = () => {
    setIsDeleting(true);
    // Delay the deletion to allow animation to complete
    setTimeout(() => handleDelete(university.name), 300);
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "university-item ".concat(isDeleting ? 'deleting' : '')
  }, /*#__PURE__*/_react.default.createElement("h3", null, university.name), /*#__PURE__*/_react.default.createElement("p", null, university.country), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: "/details/".concat(encodeURIComponent(university.name)),
    state: {
      university
    },
    className: "details-link"
  }, "View Details"), /*#__PURE__*/_react.default.createElement("button", {
    onClick: handleClickDelete,
    className: "delete-button"
  }, "Delete")));
};
var _default = exports.default = UniversityItem;