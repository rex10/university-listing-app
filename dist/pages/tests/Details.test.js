"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@testing-library/react");
var _reactRouterDom = require("react-router-dom");
var _Details = _interopRequireDefault(require("../Details"));
// Mock the useNavigate hook from react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));
const mockUniversity = {
  name: 'Test University',
  country: 'Test Country',
  domains: ['test.edu'],
  web_pages: ['http://www.test.edu']
};
describe('Details Component', () => {
  it('renders university details correctly', () => {
    (0, _react2.render)( /*#__PURE__*/_react.default.createElement(_reactRouterDom.MemoryRouter, {
      initialEntries: [{
        state: {
          university: mockUniversity
        }
      }]
    }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Routes, null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
      path: "/",
      element: /*#__PURE__*/_react.default.createElement(_Details.default, null)
    }))));
    expect(_react2.screen.getByText('Test University')).toBeInTheDocument();
    expect(_react2.screen.getByText('Country:')).toBeInTheDocument();
    expect(_react2.screen.getByText('Test Country')).toBeInTheDocument();
    expect(_react2.screen.getByText('Domain(s):')).toBeInTheDocument();
    expect(_react2.screen.getByText('test.edu')).toBeInTheDocument();
    expect(_react2.screen.getByText('Website(s):')).toBeInTheDocument();
    expect(_react2.screen.getByText('http://www.test.edu')).toBeInTheDocument();
  });
  it('displays a message when university data is not found', () => {
    (0, _react2.render)( /*#__PURE__*/_react.default.createElement(_reactRouterDom.MemoryRouter, null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Routes, null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
      path: "/",
      element: /*#__PURE__*/_react.default.createElement(_Details.default, null)
    }))));
    expect(_react2.screen.getByText('University data not found.')).toBeInTheDocument();
  });
  it('navigates back when the back button is clicked', () => {
    (0, _react2.render)( /*#__PURE__*/_react.default.createElement(_reactRouterDom.MemoryRouter, {
      initialEntries: [{
        state: {
          university: mockUniversity
        }
      }]
    }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Routes, null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
      path: "/",
      element: /*#__PURE__*/_react.default.createElement(_Details.default, null)
    }))));
    const backButton = _react2.screen.getByText('Back');
    _react2.fireEvent.click(backButton);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
  it('renders multiple websites correctly', () => {
    const universityWithMultipleWebsites = {
      ...mockUniversity,
      web_pages: ['http://www.test.edu', 'http://www.test2.edu']
    };
    (0, _react2.render)( /*#__PURE__*/_react.default.createElement(_reactRouterDom.MemoryRouter, {
      initialEntries: [{
        state: {
          university: universityWithMultipleWebsites
        }
      }]
    }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Routes, null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
      path: "/",
      element: /*#__PURE__*/_react.default.createElement(_Details.default, null)
    }))));
    const links = _react2.screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', 'http://www.test.edu');
    expect(links[1]).toHaveAttribute('href', 'http://www.test2.edu');
  });
});