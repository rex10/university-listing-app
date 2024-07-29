import universityController from '../universityController';
import getUniversities from '../../services/apiService';
import { saveToLocalStorage, getFromLocalStorage } from '../../utils/localStorage';

jest.mock('../../services/apiService');
jest.mock('../../utils/localStorage');

describe('universityController', () => {
  // Test fetchUniversities
  describe('fetchUniversities', () => {
    it('should return data from localStorage if available', async () => {
      const mockData = [{ name: 'University A' }];
      getFromLocalStorage.mockReturnValue(mockData);

      const data = await universityController.fetchUniversities();
      expect(data).toEqual(mockData);
      expect(getUniversities).not.toHaveBeenCalled();
    });

    it('should fetch data from API and cache it if localStorage is empty', async () => {
      const mockData = [{ name: 'University A' }];
      getFromLocalStorage.mockReturnValue(null);
      getUniversities.mockResolvedValue(mockData);

      const data = await universityController.fetchUniversities();
      expect(data).toEqual(mockData);
      expect(getUniversities).toHaveBeenCalled();
      expect(saveToLocalStorage).toHaveBeenCalledWith('universities', mockData);
    });

    it('should throw an error if API returns invalid data', async () => {
      getFromLocalStorage.mockReturnValue(null);
      getUniversities.mockResolvedValue({});

      await expect(universityController.fetchUniversities()).rejects.toThrow('Invalid data format from API');
    });
  });

  // Test sortUniversities
  describe('sortUniversities', () => {
    it('should sort universities in ascending order', () => {
      const universities = [{ name: 'B University' }, { name: 'A University' }];
      const sorted = universityController.sortUniversities(universities, 'asc');
      expect(sorted).toEqual([{ name: 'A University' }, { name: 'B University' }]);
    });

    it('should sort universities in descending order', () => {
      const universities = [{ name: 'A University' }, { name: 'B University' }];
      const sorted = universityController.sortUniversities(universities, 'desc');
      expect(sorted).toEqual([{ name: 'B University' }, { name: 'A University' }]);
    });
  });

  // Test filterUniversities
  describe('filterUniversities', () => {
    it('should filter universities by search term and filter', () => {
      const universities = [
        { name: 'University A' },
        { name: 'University B' },
        { name: 'College C' }
      ];
      const filtered = universityController.filterUniversities(universities, 'A', 'University');
      expect(filtered).toEqual([{ name: 'University A' }]);
    });

    it('should return all universities if filter is "all"', () => {
      const universities = [
        { name: 'University A' },
        { name: 'University B' }
      ];
      const filtered = universityController.filterUniversities(universities, '', 'all');
      expect(filtered).toEqual(universities);
    });
  });

  // Test deleteUniversity
  describe('deleteUniversity', () => {
    it('should delete the university and update localStorage', () => {
      const universities = [{ name: 'University A' }, { name: 'University B' }];
      const updated = universityController.deleteUniversity(universities, 'University A');
      expect(updated).toEqual([{ name: 'University B' }]);
      expect(saveToLocalStorage).toHaveBeenCalledWith('universities', [{ name: 'University B' }]);
    });
  });
});
