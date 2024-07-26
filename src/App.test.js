import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Listing from './pages/Listing';
import Details from './pages/Details';

jest.mock('./pages/Listing', () => () => <div>Mocked Listing Page</div>);
jest.mock('./pages/Details', () => () => <div>Mocked Details Page</div>);

describe('App Component', () => {
  test('renders Listing page at root path', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<Listing />} />
          </Routes>
        </MemoryRouter>
      );
    });

    // Check if Listing page elements are present
    expect(screen.getByText(/Mocked Listing Page/i)).toBeInTheDocument();
  });

  test('renders Details page for specific university', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/details/Test%20University']}>
          <Routes>
            <Route path="/details/:name" element={<Details />} />
          </Routes>
        </MemoryRouter>
      );
    });

    // Check if Details page elements are present
    expect(screen.getByText(/Mocked Details Page/i)).toBeInTheDocument();
  });
});
