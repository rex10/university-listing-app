"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRouterDom = require("react-router-dom");
require("../styles/details.css");
const Details = () => {
  const location = (0, _reactRouterDom.useLocation)();
  const navigate = (0, _reactRouterDom.useNavigate)();
  const {
    university
  } = location.state || {};
  if (!university) {
    return /*#__PURE__*/_react.default.createElement("p", null, "University data not found.");
  }
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "details-container"
  }, /*#__PURE__*/_react.default.createElement("button", {
    className: "back-button",
    onClick: () => navigate(-1)
  }, "Back"), /*#__PURE__*/_react.default.createElement("h1", null, university.name), /*#__PURE__*/_react.default.createElement("p", null, /*#__PURE__*/_react.default.createElement("strong", null, "Country:"), " ", university.country), /*#__PURE__*/_react.default.createElement("p", null, /*#__PURE__*/_react.default.createElement("strong", null, "Domain(s):"), " ", university.domains.join(', ')), /*#__PURE__*/_react.default.createElement("p", null, /*#__PURE__*/_react.default.createElement("strong", null, "Website(s):")), /*#__PURE__*/_react.default.createElement("ul", null, university.web_pages.map((website, index) => /*#__PURE__*/_react.default.createElement("li", {
    key: index
  }, /*#__PURE__*/_react.default.createElement("a", {
    href: website,
    target: "_blank",
    rel: "noopener noreferrer"
  }, website)))));
};
var _default = exports.default = Details;