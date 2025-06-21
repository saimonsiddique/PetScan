import { create } from 'zustand';

/**
 * Zustand store for managing global user state.
 * @typedef {object} UserState
 * @property {object|null} user - The current user object, or null if no user is logged in.
 * @property {(user: object|null) => void} setUser - Action to set the current user.
 * @property {() => void} clearUser - Action to clear the current user, setting them to null.
 */

/**
 * @type {import('zustand').UseBoundStore<import('zustand').StoreApi<UserState>>}
 */
const useUserStore = create((set) => ({
  user: null,
  /**
   * Sets the current user in the store.
   * @param {object | null} user - The user object to set, or null to clear the user.
   */
  setUser: (user) => set({ user }),
  /**
   * Clears the current user from the store, setting user to null.
   */
  clearUser: () => set({ user: null }),
}));

export default useUserStore;
