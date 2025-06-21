import { render, screen } from '@testing-library/react';
import ParentProfile from './ParentProfile';
import useUserStore from '../../../store/userStore';

// Mock child components
jest.mock('../../SideBar/ProfileSideBar/ProfileSideBar', () => () => (
  <div data-testid='profile-sidebar-mock'>ProfileSideBar Mock</div>
));
jest.mock('../../NavBar/ProfileNavBar/ProfileNavBar', () => () => (
  <div data-testid='profile-navbar-mock'>ProfileNavBar Mock</div>
));
jest.mock('../../Dashboard/DashboardContainer', () => () => (
  <div data-testid='dashboard-container-mock'>DashboardContainer Mock</div>
));

// Mock the store
jest.mock('../../../store/userStore');

describe('ParentProfile', () => {
  beforeEach(() => {
    // Reset mocks before each test
    useUserStore.mockReset();
  });

  it('renders its child components when no user is present', () => {
    useUserStore.mockReturnValue({ user: null }); // Mock state with no user
    render(<ParentProfile />);
    expect(screen.getByTestId('profile-sidebar-mock')).toBeInTheDocument();
    expect(screen.getByTestId('profile-navbar-mock')).toBeInTheDocument();
    expect(screen.getByTestId('dashboard-container-mock')).toBeInTheDocument();
  });

  it('renders its child components when a user is present', () => {
    const mockUser = { name: 'John Doe', email: 'john.doe@example.com' };
    useUserStore.mockReturnValue({ user: mockUser }); // Mock state with a user
    render(<ParentProfile />);
    // ParentProfile itself doesn't directly display user info, it relies on children.
    // The main check here is that it renders correctly and passes data down (implicitly tested by children rendering).
    expect(screen.getByTestId('profile-sidebar-mock')).toBeInTheDocument();
    expect(screen.getByTestId('profile-navbar-mock')).toBeInTheDocument();
    expect(screen.getByTestId('dashboard-container-mock')).toBeInTheDocument();

    // If ParentProfile were to display something itself based on the user, you'd assert that here.
    // For example, if it had a welcome message:
    // expect(screen.getByText(`Welcome, ${mockUser.name}`)).toBeInTheDocument();
    // Since it doesn't, we just ensure the structure is rendered.
  });

  // Note: The ParentProfile component currently doesn't have specific logic
  // for different user states (e.g., loading, or explicitly showing user name itself).
  // It primarily acts as a layout container for its children.
  // The user object from useUserStore is available in its scope but not directly used in its JSX.
  // If child components were not mocked, we could test for user information displayed by them.
});
