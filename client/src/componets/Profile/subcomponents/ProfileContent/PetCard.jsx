import { useState, useEffect, useContext } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActionArea,
  CardActions,
} from "@mui/material";
import { UserContext } from "../../../../Pages/Dashboard";
import petImg from "../../../../../public/PetInfo/pet-info-dog.jpg";

const initialState = {
  petName: "",
  petSpecies: "",
  petAge: "",
  ageUnit: "",
  petWeight: "",
  weightUnit: "",
};

const PetCard = (props) => {
  const [state, setState] = useState(initialState);
  const { pet } = props;
  const { petName, petSpecies, petAge, ageUnit, petWeight, weightUnit } = pet;

  return (
    <section className="pet-card">
      <Card
        sx={{
          minWidth: 250,
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
    </section>
  );
};

export default PetCard;
