import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActionArea,
  CardActions,
} from "@mui/material";
import petImg from "../../../../../public/PetInfo/pet-info-dog.jpg";

const PetCard = () => {
  return (
    <section className="pet-card">
      <Card
        sx={{
          minWidth: 355,
        }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={petImg}
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
              Your Pet Name
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              Your Pet Description
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </section>
  );
};

export default PetCard;
