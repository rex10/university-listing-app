import universityController from '../universityController';
import getUniversities from '../../services/apiService';

// Mock the module
jest.mock('../../services/apiService');

describe('universityController', () => {
  it('throws an error if the fetch fails', async () => {
    // Set up the mock implementation to reject with an error
    getUniversities.mockRejectedValue(new Error('Network error'));

    // Call the function to test and assert it throws an error
    await expect(universityController.fetchUniversities()).rejects.toThrow('Network error');
  });

  it('throws an error if the data format is invalid', async () => {
    // Set up the mock implementation to return invalid data
    getUniversities.mockResolvedValue({ notAnArray: [] });

    // Call the function to test and assert it throws an error
    await expect(universityController.fetchUniversities()).rejects.toThrow('Invalid data format from API');
  });

  it('fetches universities successfully from API', async () => {
    // Define a mock response
    const universities = [
      { name: 'University A', country: 'United Arab Emirates' },
      { name: 'University B', country: 'United Arab Emirates' },
    ];

    // Set up the mock implementation to return valid data
    getUniversities.mockResolvedValue(universities);

    // Call the function to test
    const result = await universityController.fetchUniversities();
    expect(result).toEqual(universities);
  });
});
