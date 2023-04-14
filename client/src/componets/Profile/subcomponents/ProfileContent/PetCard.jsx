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

  // get petinfo from context
  const { parent } = useContext(UserContext);
  console.log("pets", parent.pets);

  useEffect(() => {
    setState({
      petName: parent.pets[0].petName,
      petSpecies: parent.pets[0].petSpecies,
      petAge: parent.pets[0].petAge,
      ageUnit: parent.pets[0].ageUnit,
      petWeight: parent.pets[0].petWeight,
      weightUnit: parent.pets[0].weightUnit,
    });
  }, [parent]);

  const { petName, petSpecies, petAge, ageUnit, petWeight, weightUnit } = state;

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
