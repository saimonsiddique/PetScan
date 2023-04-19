import axios from "axios";
import { useContext } from "react";
import { Box, Button, Typography } from "@mui/material";
const apiUrl = "https://api.cloudinary.com/v1_1/dru7kzv3i";
import { ImageContext } from "../../App";
const ImageUpload = () => {
  const { setImage } = useContext(ImageContext);

  const uploadImage = async (e) => {
    e.preventDefault();
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "petScan");
    formData.append("cloud_name", "dru7kzv3i");
    try {
      const res = await axios.post(`${apiUrl}/image/upload`, formData);
      setImage(res.data.url);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "20vw",
      }}
    >
      <Box>
        <Button variant="contained" component="label">
          Upload
          <input type="file" hidden onChange={uploadImage} />
        </Button>
      </Box>
    </Box>
  );
};

export default ImageUpload;
