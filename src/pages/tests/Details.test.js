import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Details from '../Details';

// Mock the useNavigate hook from react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const mockUniversity = {
  name: 'Test University',
  country: 'Test Country',
  domains: ['test.edu'],
  web_pages: ['http://www.test.edu'],
};

describe('Details Component', () => {
  it('renders university details correctly', () => {
    render(
      <MemoryRouter initialEntries={[{ state: { university: mockUniversity } }]}>
        <Routes>
          <Route path="/" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Test University')).toBeInTheDocument();
    expect(screen.getByText('Country:')).toBeInTheDocument();
    expect(screen.getByText('Test Country')).toBeInTheDocument();
    expect(screen.getByText('Domain(s):')).toBeInTheDocument();
    expect(screen.getByText('test.edu')).toBeInTheDocument();
    expect(screen.getByText('Website(s):')).toBeInTheDocument();
    expect(screen.getByText('http://www.test.edu')).toBeInTheDocument();
  });

  it('displays a message when university data is not found', () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('University data not found.')).toBeInTheDocument();
  });

  it('navigates back when the back button is clicked', () => {
    render(
      <MemoryRouter initialEntries={[{ state: { university: mockUniversity } }]}>
        <Routes>
          <Route path="/" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );

    const backButton = screen.getByText('Back');
    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it('renders multiple websites correctly', () => {
    const universityWithMultipleWebsites = {
      ...mockUniversity,
      web_pages: ['http://www.test.edu', 'http://www.test2.edu'],
    };

    render(
      <MemoryRouter initialEntries={[{ state: { university: universityWithMultipleWebsites } }]}>
        <Routes>
          <Route path="/" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', 'http://www.test.edu');
    expect(links[1]).toHaveAttribute('href', 'http://www.test2.edu');
  });
});
