import useUserStore from './userStore';
import { act } from '@testing-library/react'; // Import act for store updates

describe('useUserStore', () => {
  beforeEach(() => {
    // Reset store before each test
    act(() => {
      useUserStore.setState({ user: null });
    });
  });

  it('should have initial state with user as null', () => {
    const { user } = useUserStore.getState();
    expect(user).toBeNull();
  });

  it('should set user correctly', () => {
    const mockUser = { id: 1, name: 'Test User' };
    act(() => {
      useUserStore.getState().setUser(mockUser);
    });
    const { user } = useUserStore.getState();
    expect(user).toEqual(mockUser);
  });

  it('should clear user correctly', () => {
    const mockUser = { id: 1, name: 'Test User' };
    // Set a user first
    act(() => {
      useUserStore.getState().setUser(mockUser);
    });
    // Then clear the user
    act(() => {
      useUserStore.getState().clearUser();
    });
    const { user } = useUserStore.getState();
    expect(user).toBeNull();
  });
});
