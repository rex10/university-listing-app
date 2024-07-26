import React from 'react';
import { render, screen, act } from '@testing-library/react';
import Listing from '../Listing';

jest.mock('../../models/universityController', () => ({
  fetchUniversities: jest.fn().mockResolvedValue([
    { name: 'University A', country: 'United Arab Emirates' },
    { name: 'University B', country: 'United Arab Emirates' },
  ]),
  sortUniversities: jest.fn(),
  filterUniversities: jest.fn((universities) => universities),
  deleteUniversity: jest.fn(),
}));

jest.mock('../../components/UniversityItem', () => ({ university }) => (
  <div data-testid="university-item">{university.name}</div>
));
jest.mock('../../components/SearchBar', () => ({ searchTerm, handleSearch }) => (
  <input value={searchTerm} onChange={handleSearch} />
));
jest.mock('../../components/SortingOptions', () => ({ sortOrder, handleSort }) => (
  <select value={sortOrder} onChange={(e) => handleSort(e.target.value)}>
    <option value="asc">Ascending</option>
    <option value="desc">Descending</option>
  </select>
));
jest.mock('../../components/FilterOptions', () => ({ filter, handleFilter }) => (
  <select value={filter} onChange={(e) => handleFilter(e.target.value)}>
    <option value="all">All</option>
    <option value="college">College</option>
    <option value="institute">Institute</option>
    <option value="university">University</option>
  </select>
));

describe('Listing Component', () => {
  test('renders without crashing', async () => {
    await act(async () => {
      render(<Listing />);
    });

    expect(screen.getByText('University Listings')).toBeInTheDocument();
  });
});
