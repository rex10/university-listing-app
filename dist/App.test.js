"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@testing-library/react");
var _reactRouterDom = require("react-router-dom");
var _Listing = _interopRequireDefault(require("./pages/Listing"));
var _Details = _interopRequireDefault(require("./pages/Details"));
// Mock component to test routing
const MockComponent = _ref => {
  let {
    children
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_reactRouterDom.MemoryRouter, {
    initialEntries: ['/']
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Routes, null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: "/",
    element: children
  })));
};
describe('App Component', () => {
  test('renders Listing page at root path', () => {
    (0, _react2.render)( /*#__PURE__*/_react.default.createElement(MockComponent, null, /*#__PURE__*/_react.default.createElement(_Listing.default, null)));

    // Check if Listing page elements are present
    expect(_react2.screen.getByText(/University Listings/i)).toBeInTheDocument();
  });
  test('renders Details page for specific university', async () => {
    // Mock the details data
    const mockUniversity = {
      name: 'Test University',
      country: 'Test Country',
      domains: ['test.edu'],
      web_pages: ['https://www.test.edu']
    };
    (0, _react2.render)( /*#__PURE__*/_react.default.createElement(_reactRouterDom.MemoryRouter, {
      initialEntries: ['/details/Test%20University']
    }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Routes, null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
      path: "/details/:name",
      element: /*#__PURE__*/_react.default.createElement(_Details.default, null)
    }))));

    // Wait for the Details component to render
    await (0, _react2.waitFor)(() => {
      expect(_react2.screen.getByText('Test University')).toBeInTheDocument();
      expect(_react2.screen.getByText('Test Country')).toBeInTheDocument();
    });
  });
});