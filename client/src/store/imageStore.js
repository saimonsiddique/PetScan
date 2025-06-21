import { create } from 'zustand';

/**
 * Zustand store for managing global image state, typically for image uploads or previews.
 * @typedef {object} ImageState
 * @property {string|null} image - URL or data URI of the current image, or null if no image is set.
 * @property {(image: string|null) => void} setImage - Action to set the current image.
 * @property {() => void} clearImage - Action to clear the current image, setting it to null.
 */

/**
 * @type {import('zustand').UseBoundStore<import('zustand').StoreApi<ImageState>>}
 */
const useImageStore = create((set) => ({
  image: null,
  /**
   * Sets the current image in the store.
   * @param {string | null} image - The image URL or data URI to set, or null to clear the image.
   */
  setImage: (image) => set({ image }),
  /**
   * Clears the current image from the store, setting image to null.
   */
  clearImage: () => set({ image: null }),
}));

export default useImageStore;
