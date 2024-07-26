import axios from 'axios';
import getUniversities from '../apiService';

jest.mock('axios');

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  console.error.mockRestore();
});

describe('getUniversities', () => {
  it('fetches universities successfully from API', async () => {
    const universities = [
      { name: 'University A', country: 'United Arab Emirates' },
      { name: 'University B', country: 'United Arab Emirates' },
    ];

    axios.get.mockResolvedValue({ data: universities });

    const result = await getUniversities();
    expect(result).toEqual(universities);
  });

  it('throws an error if the fetch fails', async () => {
    axios.get.mockRejectedValue(new Error('Network error'));

    await expect(getUniversities()).rejects.toThrow('Network error');
  });
});
