import { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from "@mui/material";
import PetModal from "../../../CardModal/PetModal";

const PetCard = (props) => {
  const { pet } = props;
  const { petName, petSpecies, petPhoto } = pet;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <section className="pet-card">
      <Card
        sx={{
          minWidth: 250,
        }}
      >
        <CardActionArea onClick={handleOpen}>
          <CardMedia
            component="img"
            height="145"
            image={
              petPhoto
                ? petPhoto
                : "https://res.cloudinary.com/dru7kzv3i/image/upload/v1687851370/pet-info-dog_qgsncw.jpg"
            }
            alt="Your Pet"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {petName ? petName : "Your Pet Name"}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {petSpecies ? petSpecies : "Your Pet Species"}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <PetModal
        handleOpen={handleOpen}
        handleClose={handleClose}
        open={open}
        setOpen={setOpen}
        pet={pet}
      />
    </section>
  );
};

export default PetCard;
