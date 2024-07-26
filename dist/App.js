"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRouterDom = require("react-router-dom");
var _Listing = _interopRequireDefault(require("./pages/Listing"));
var _Details = _interopRequireDefault(require("./pages/Details"));
var _ErrorBoundary = _interopRequireDefault(require("./ErrorBoundary"));
const App = () => {
  return /*#__PURE__*/_react.default.createElement(_ErrorBoundary.default, null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.BrowserRouter, null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Routes, null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: "/",
    element: /*#__PURE__*/_react.default.createElement(_Listing.default, null)
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: "/details/:name",
    element: /*#__PURE__*/_react.default.createElement(_Details.default, null)
  }))));
};
var _default = exports.default = App;