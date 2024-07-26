"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _apiService = _interopRequireDefault(require("./apiService"));
// Adjust the import path as necessary

const mockFetch = jest.fn();
global.fetch = mockFetch;
describe('apiService', () => {
  const mockUniversities = [{
    name: 'University A',
    country: 'United Arab Emirates'
  }, {
    name: 'University B',
    country: 'United Arab Emirates'
  }];
  beforeEach(() => {
    mockFetch.mockClear(); // Clear previous calls to fetch before each test
  });
  it('fetches successfully data from an API', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUniversities
    });
    const result = await _apiService.default.getUniversities();
    expect(result).toEqual(mockUniversities); // Check if the result matches the mock data
    expect(mockFetch).toHaveBeenCalledWith('http://universities.hipolabs.com/search?country=United%20Arab%20Emirates&'); // Verify the URL called
  });
  it('throws an error when the response is not ok', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404
    });
    await expect(_apiService.default.getUniversities()).rejects.toThrow('HTTP error! Status: 404'); // Check if the error is thrown correctly
  });
  it('fetches data with parameters', async () => {
    const params = {
      name: 'University A'
    };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUniversities
    });
    const result = await _apiService.default.getUniversities(params);
    expect(result).toEqual(mockUniversities); // Check if the result matches the mock data
    expect(mockFetch).toHaveBeenCalledWith('http://universities.hipolabs.com/search?country=United%20Arab%20Emirates&name=University+A'); // Verify the URL called with parameters
  });
});