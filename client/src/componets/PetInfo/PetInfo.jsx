import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Button,
} from "@mui/material";
import "./PetInfo.css";

const initialState = {
  petName: "",
  petSpecies: "",
  petAge: "",
  petWeight: "",
  petGender: "",
  previousMedicalHistory: "",
  petPhoto: "",
};

const petSpecies = ["Dog", "Cat", "Bird", "Fish", "Farm Animal", "Other"];

const PetInfo = () => {
  const [state, setState] = useState(initialState);
  const [petWeightUnit, setWeightUnit] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(state);
  };

  return (
    <>
      <section className="pet-container">
        <div className="pet-info">
          <h1>Pet Info</h1>
          <div className="pet-form">
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "50ch" },
              }}
              noValidate
            >
              <TextField
                required
                name="petName"
                label="Pet Name"
                variant="outlined"
                onChange={handleChange}
              />
            </Box>
            <Box sx={{ width: "50ch" }}>
              <FormControl fullWidth>
                <InputLabel>Species</InputLabel>
                <Select
                  name="petSpecies"
                  value={state.petSpecies}
                  label="Species"
                  onChange={handleChange}
                >
                  {petSpecies.map((species) => (
                    <MenuItem key={species} value={species}>
                      {species}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "40ch" },
              }}
              noValidate
            >
              <TextField
                required
                name="petAge"
                label="Pet Age"
                variant="outlined"
                onChange={handleChange}
              />
              <Button
                variant="outlined"
                style={{ width: "3ch", height: "6ch", marginTop: "1.4ch" }}
              >
                years
              </Button>
              <Button
                variant="outlined"
                style={{
                  width: "3ch",
                  height: "6ch",
                  marginTop: "1.4ch",
                  marginLeft: "1ch",
                }}
              >
                months
              </Button>
            </Box>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "40ch" },
              }}
              noValidate
            >
              <TextField
                required
                name="petWeight"
                label="Pet Weight"
                variant="outlined"
                onChange={handleChange}
              />
              <Button
                variant="outlined"
                style={{ width: "3ch", height: "6ch", marginTop: "1.4ch" }}
              >
                KG
              </Button>
            </Box>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "50ch" },
              }}
              noValidate
            >
              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select
                  name="petGender"
                  value={state.petGender}
                  label="Gender"
                  onChange={handleChange}
                >
                  <MenuItem value={"male"}>Male</MenuItem>
                  <MenuItem value={"female"}>Female</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <span style={{ marginTop: "1rem" }}>
              Is your pet spayed or neutered?
            </span>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "50ch" },
              }}
              noValidate
            >
              <Button
                variant="outlined"
                style={{ width: "2ch", marginTop: "1.4ch" }}
              >
                Yes
              </Button>
              <Button
                variant="outlined"
                style={{
                  width: "2ch",
                  marginTop: "1.4ch",
                  marginLeft: "1ch",
                }}
              >
                No
              </Button>
            </Box>
            <div className="submit-btn">
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "50ch" },
                }}
                noValidate
              >
                <Button variant="outlined">Submit</Button>
              </Box>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PetInfo;
