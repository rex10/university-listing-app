"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _universityController = _interopRequireDefault(require("../universityController"));
var _apiService = _interopRequireDefault(require("../../services/apiService"));
var _localStorage = require("../../utils/localStorage");
// Mock the external modules
jest.mock('../../services/apiService');
jest.mock('../../utils/localStorage');
describe('universityController', () => {
  // Test fetchUniversities
  describe('fetchUniversities', () => {
    it('should return data from localStorage if available', async () => {
      const mockData = [{
        name: 'University A'
      }];
      _localStorage.getFromLocalStorage.mockReturnValue(mockData);
      const data = await _universityController.default.fetchUniversities();
      expect(data).toEqual(mockData);
      expect(_apiService.default.getUniversities).not.toHaveBeenCalled();
    });
    it('should fetch data from API and cache it if localStorage is empty', async () => {
      const mockData = [{
        name: 'University A'
      }];
      _localStorage.getFromLocalStorage.mockReturnValue(null);
      _apiService.default.getUniversities.mockResolvedValue(mockData);
      const data = await _universityController.default.fetchUniversities();
      expect(data).toEqual(mockData);
      expect(_apiService.default.getUniversities).toHaveBeenCalled();
      expect(_localStorage.saveToLocalStorage).toHaveBeenCalledWith('universities', mockData);
    });
    it('should throw an error if API returns invalid data', async () => {
      _localStorage.getFromLocalStorage.mockReturnValue(null);
      _apiService.default.getUniversities.mockResolvedValue({});
      await expect(_universityController.default.fetchUniversities()).rejects.toThrow('Invalid data format from API');
    });
  });

  // Test sortUniversities
  describe('sortUniversities', () => {
    it('should sort universities in ascending order', () => {
      const universities = [{
        name: 'B University'
      }, {
        name: 'A University'
      }];
      const sorted = _universityController.default.sortUniversities(universities, 'asc');
      expect(sorted).toEqual([{
        name: 'A University'
      }, {
        name: 'B University'
      }]);
    });
    it('should sort universities in descending order', () => {
      const universities = [{
        name: 'A University'
      }, {
        name: 'B University'
      }];
      const sorted = _universityController.default.sortUniversities(universities, 'desc');
      expect(sorted).toEqual([{
        name: 'B University'
      }, {
        name: 'A University'
      }]);
    });
  });

  // Test filterUniversities
  describe('filterUniversities', () => {
    it('should filter universities by search term and filter', () => {
      const universities = [{
        name: 'University A'
      }, {
        name: 'University B'
      }, {
        name: 'College C'
      }];
      const filtered = _universityController.default.filterUniversities(universities, 'A', 'College');
      expect(filtered).toEqual([{
        name: 'University A'
      }]);
    });
    it('should return all universities if filter is "all"', () => {
      const universities = [{
        name: 'University A'
      }, {
        name: 'University B'
      }];
      const filtered = _universityController.default.filterUniversities(universities, '', 'all');
      expect(filtered).toEqual(universities);
    });
  });

  // Test deleteUniversity
  describe('deleteUniversity', () => {
    it('should delete the university and update localStorage', () => {
      const universities = [{
        name: 'University A'
      }, {
        name: 'University B'
      }];
      const updated = _universityController.default.deleteUniversity(universities, 'University A');
      expect(updated).toEqual([{
        name: 'University B'
      }]);
      expect(_localStorage.saveToLocalStorage).toHaveBeenCalledWith('universities', [{
        name: 'University B'
      }]);
    });
  });
});