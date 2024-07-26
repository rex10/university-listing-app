import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import UniversityItem from '../UniversityItem';

// Mock the handleDelete function
const mockHandleDelete = jest.fn();

describe('UniversityItem Component', () => {
  const university = {
    name: 'Harvard University',
    country: 'USA',
  };

  test('renders university information correctly', () => {
    render(
      <MemoryRouter>
        <UniversityItem university={university} handleDelete={mockHandleDelete} />
      </MemoryRouter>
    );

    expect(screen.getByText(university.name)).toBeInTheDocument();
    expect(screen.getByText(university.country)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /View Details/i })).toHaveAttribute('href', `/details/${encodeURIComponent(university.name)}`);
  });

  test('triggers handleDelete after animation on delete button click', async () => {
    render(
      <MemoryRouter>
        <UniversityItem university={university} handleDelete={mockHandleDelete} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /Delete/i }));

    // Check if the 'deleting' class is added
    expect(screen.getByText(university.name).closest('div')).toHaveClass('deleting');

    // Wait for the deletion delay to complete
    await waitFor(() => {
      expect(mockHandleDelete).toHaveBeenCalledWith(university.name);
    }, { timeout: 350 });
  });
});
