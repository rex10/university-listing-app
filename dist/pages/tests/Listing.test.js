"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _react = _interopRequireDefault(require("react"));
var _react2 = require("@testing-library/react");
require("@testing-library/jest-dom/");
var _Listing = _interopRequireDefault(require("../Listing"));
var _universityController = _interopRequireDefault(require("../../models/universityController"));
// Mock the universityController
jest.mock('../../models/universityController');
const mockUniversities = [{
  name: 'University A',
  location: 'Location A'
}, {
  name: 'University B',
  location: 'Location B'
}, {
  name: 'University C',
  location: 'Location C'
}];
describe('Listing Component', () => {
  beforeEach(() => {
    _universityController.default.fetchUniversities.mockResolvedValue(mockUniversities);
    _universityController.default.sortUniversities.mockImplementation((universities, order) => {
      return order === 'asc' ? universities : universities.reverse();
    });
    _universityController.default.filterUniversities.mockImplementation((universities, searchTerm, filter) => {
      return universities.filter(uni => uni.name.includes(searchTerm));
    });
    _universityController.default.deleteUniversity.mockImplementation((universities, name) => {
      return universities.filter(uni => uni.name !== name);
    });
  });
  it('renders the Listing component', async () => {
    (0, _react2.render)( /*#__PURE__*/_react.default.createElement(_Listing.default, null));
    expect(_react2.screen.getByText('University Listings')).toBeInTheDocument();
    await (0, _react2.waitFor)(() => expect(_react2.screen.getByText('University A')).toBeInTheDocument());
  });
  it('fetches and displays universities', async () => {
    (0, _react2.render)( /*#__PURE__*/_react.default.createElement(_Listing.default, null));
    await (0, _react2.waitFor)(() => {
      expect(_react2.screen.getByText('University A')).toBeInTheDocument();
      expect(_react2.screen.getByText('University B')).toBeInTheDocument();
      expect(_react2.screen.getByText('University C')).toBeInTheDocument();
    });
  });
  it('filters universities based on search term', async () => {
    (0, _react2.render)( /*#__PURE__*/_react.default.createElement(_Listing.default, null));
    await (0, _react2.waitFor)(() => _react2.screen.getByText('University A'));
    _react2.fireEvent.change(_react2.screen.getByLabelText('Search:'), {
      target: {
        value: 'A'
      }
    });
    expect(_react2.screen.getByText('University A')).toBeInTheDocument();
    expect(_react2.screen.queryByText('University B')).not.toBeInTheDocument();
  });
  it('sorts universities based on sort order', async () => {
    (0, _react2.render)( /*#__PURE__*/_react.default.createElement(_Listing.default, null));
    await (0, _react2.waitFor)(() => _react2.screen.getByText('University A'));
    _react2.fireEvent.click(_react2.screen.getByLabelText('Sort:'));
    _react2.fireEvent.click(_react2.screen.getByText('Descending'));
    expect(_react2.screen.getByText('University C')).toBeInTheDocument();
  });
  it('filters universities based on filter option', async () => {
    (0, _react2.render)( /*#__PURE__*/_react.default.createElement(_Listing.default, null));
    await (0, _react2.waitFor)(() => _react2.screen.getByText('University A'));
    _react2.fireEvent.change(_react2.screen.getByLabelText('Filter:'), {
      target: {
        value: 'B'
      }
    });
    expect(_react2.screen.getByText('University B')).toBeInTheDocument();
    expect(_react2.screen.queryByText('University A')).not.toBeInTheDocument();
  });
  it('toggles between list and grid view', async () => {
    (0, _react2.render)( /*#__PURE__*/_react.default.createElement(_Listing.default, null));
    await (0, _react2.waitFor)(() => _react2.screen.getByText('University A'));
    _react2.fireEvent.click(_react2.screen.getByText('Switch to Grid View'));
    expect(_react2.screen.getByText('Switch to List View')).toBeInTheDocument();
  });
  it('deletes a university from the list', async () => {
    (0, _react2.render)( /*#__PURE__*/_react.default.createElement(_Listing.default, null));
    await (0, _react2.waitFor)(() => _react2.screen.getByText('University A'));
    _react2.fireEvent.click(_react2.screen.getByText('Delete University A'));
    expect(_react2.screen.queryByText('University A')).not.toBeInTheDocument();
  });
});