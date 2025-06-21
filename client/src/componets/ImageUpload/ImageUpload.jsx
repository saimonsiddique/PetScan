import axios from 'axios';
// useContext is removed as it's no longer used directly from 'react'
import { Box, Button, Typography } from '@mui/material';
const apiUrl = 'https://api.cloudinary.com/v1_1/dru7kzv3i';
import useImageStore from '../../store/imageStore'; // Import useImageStore

const ImageUpload = () => {
  const { setImage } = useImageStore(); // Use useImageStore

  const uploadImage = async (e) => {
    e.preventDefault();
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'petScan');
    formData.append('cloud_name', 'dru7kzv3i');
    try {
      const res = await axios.post(`${apiUrl}/image/upload`, formData);
      setImage(res.data.url); // setImage from useImageStore
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        width: '20vw',
      }}
    >
      <Box>
        <Button variant='contained' component='label'>
          Upload
          <input type='file' hidden onChange={uploadImage} />
        </Button>
      </Box>
    </Box>
  );
};

export default ImageUpload;
