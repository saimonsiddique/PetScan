import useImageStore from './imageStore';
import { act } from '@testing-library/react'; // Import act for store updates

describe('useImageStore', () => {
  beforeEach(() => {
    // Reset store before each test
    act(() => {
      useImageStore.setState({ image: null });
    });
  });

  it('should have initial state with image as null', () => {
    const { image } = useImageStore.getState();
    expect(image).toBeNull();
  });

  it('should set image correctly', () => {
    const mockImage = 'http://example.com/image.jpg';
    act(() => {
      useImageStore.getState().setImage(mockImage);
    });
    const { image } = useImageStore.getState();
    expect(image).toEqual(mockImage);
  });

  it('should clear image correctly', () => {
    const mockImage = 'http://example.com/image.jpg';
    // Set an image first
    act(() => {
      useImageStore.getState().setImage(mockImage);
    });
    // Then clear the image
    act(() => {
      useImageStore.getState().clearImage();
    });
    const { image } = useImageStore.getState();
    expect(image).toBeNull();
  });
});
