"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@testing-library/react");
require("@testing-library/jest-dom");
var _reactRouterDom = require("react-router-dom");
var _UniversityItem = _interopRequireDefault(require("../UniversityItem"));
// Mock the handleDelete function
const mockHandleDelete = jest.fn();
describe('UniversityItem Component', () => {
  const university = {
    name: 'Harvard University',
    country: 'USA'
  };
  test('renders university information correctly', () => {
    (0, _react2.render)( /*#__PURE__*/_react.default.createElement(_reactRouterDom.MemoryRouter, null, /*#__PURE__*/_react.default.createElement(_UniversityItem.default, {
      university: university,
      handleDelete: mockHandleDelete
    })));
    expect(_react2.screen.getByText(university.name)).toBeInTheDocument();
    expect(_react2.screen.getByText(university.country)).toBeInTheDocument();
    expect(_react2.screen.getByRole('link', {
      name: /View Details/i
    })).toHaveAttribute('href', "/details/".concat(encodeURIComponent(university.name)));
  });
  test('triggers handleDelete after animation on delete button click', async () => {
    (0, _react2.render)( /*#__PURE__*/_react.default.createElement(_reactRouterDom.MemoryRouter, null, /*#__PURE__*/_react.default.createElement(_UniversityItem.default, {
      university: university,
      handleDelete: mockHandleDelete
    })));
    _react2.fireEvent.click(_react2.screen.getByRole('button', {
      name: /Delete/i
    }));

    // Check if the 'deleting' class is added
    expect(_react2.screen.getByText(university.name).closest('div')).toHaveClass('deleting');

    // Wait for the deletion delay to complete
    await (0, _react2.waitFor)(() => {
      expect(mockHandleDelete).toHaveBeenCalledWith(university.name);
    }, {
      timeout: 350
    });
  });
});