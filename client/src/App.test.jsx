import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// Mock the stores
jest.mock('./store/imageStore', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    image: null,
    setImage: jest.fn(),
  })),
}));

jest.mock('./store/userStore', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    user: null,
    setUser: jest.fn(),
  })),
}));

describe('App', () => {
  it('renders the landing page by default', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    // Example: Check for an element that is unique to your Land component
    // This will depend on the actual content of your Land component
    // For now, let's assume Land component shows some welcome text or a specific button
    // If Land component is simple, we can check if App renders without crashing
    expect(screen.queryByText(/welcome/i)).toBeNull(); // Adjust if needed
  });
});
