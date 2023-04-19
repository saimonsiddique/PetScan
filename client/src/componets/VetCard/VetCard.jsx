import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { CardActionArea } from "@mui/material";
import CardModal from "../CardModal/CardModal";
import Rating from "@mui/material/Rating";

const VetCard = (props) => {
  const { vet } = props;
  return (
    <Card sx={{ maxWidth: 345, m: 1.5 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          sx={{ objectFit: "contain" }}
          image={vet.vetProfile}
          alt="vet image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {vet.firstName + " " + vet.lastName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Specialized in : {vet.specializedField.join(", ")}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
        }}
      >
        <Rating
          name="half-rating-read"
          defaultValue={3.5}
          precision={0.5}
          readOnly
        />
        <CardModal vet={vet} />
      </Box>
    </Card>
  );
};

export default VetCard;