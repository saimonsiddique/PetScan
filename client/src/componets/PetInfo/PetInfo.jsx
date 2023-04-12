import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Button,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Stack,
} from "@mui/material";
import "./PetInfo.css";

const initialState = {
  petName: "",
  petSpecies: "",
  petAge: "",
  ageUnit: "years",
  petWeight: "",
  weightUnit: "kg",
  petGender: "",
  neutered: Boolean,
  previousMedicalHistory: "",
  petPhoto: "",
};

const petSpecies = ["Dog", "Cat", "Bird", "Fish", "Farm Animal", "Other"];

const PetInfo = () => {
  const [state, setState] = useState(initialState);
  const [prevMed, setPrevMed] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(state);
  };

  const handleCheckbox = (e) => {
    setPrevMed(!prevMed);
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
                "& .MuiTextField-root": { m: 1, width: "90%" },
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
            <Box sx={{ m: 1, width: "90%" }}>
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
                "& .MuiTextField-root": { m: 1, width: "70%" },
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
              <FormControl sx={{ m: 1, width: "18%" }}>
                <InputLabel>Age in</InputLabel>
                <Select
                  name="ageUnit"
                  value={state.ageUnit}
                  onChange={handleChange}
                  autoWidth
                >
                  <MenuItem value={"years"}>years</MenuItem>
                  <MenuItem value={"months"}>months</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "70%" },
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
              <FormControl sx={{ m: 1, width: "18%" }}>
                <InputLabel>Unit</InputLabel>
                <Select
                  name="weightUnit"
                  value={state.weightUnit}
                  onChange={handleChange}
                  autoWidth
                  label="Weight Unit"
                >
                  <MenuItem value={"kg"}>kg</MenuItem>
                  <MenuItem value={"lbs"}>lbs</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "80%" },
              }}
              noValidate
            >
              <FormControl sx={{ m: 1, width: "70%" }}>
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
            <span style={{ marginTop: "1rem", marginLeft: "1rem" }}>
              Is your pet spayed or neutered?
            </span>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "10%" },
              }}
              noValidate
            >
              <Button
                variant="outlined"
                style={{ width: "1ch", marginTop: "1rem", marginLeft: "1rem" }}
              >
                Yes
              </Button>
              <Button
                variant="outlined"
                style={{
                  width: "1ch",
                  marginTop: "1rem",
                  marginLeft: "1rem",
                }}
              >
                No
              </Button>
            </Box>
            <section className="prev-history">
              <span>Does your pet have any previous medical history?</span>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox checked={prevMed} onChange={handleCheckbox} />
                  }
                  label="Check if yes"
                />
              </FormGroup>
            </section>

            {prevMed ? (
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "90%" },
                }}
                noValidate
              >
                <TextField
                  name="previousMedicalHistory"
                  label="Previous Medical History"
                  variant="outlined"
                  onChange={handleChange}
                />
              </Box>
            ) : null}

            <section className="prev-history">
              <span>Upload a photo of your pet </span>
              <Box>
                <Button variant="contained" component="label">
                  Upload
                  <input hidden accept="image/*" multiple type="file" />
                </Button>
              </Box>
            </section>

            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "90%" },
              }}
              noValidate
            >
              <Button
                variant="contained"
                style={{ marginTop: "1rem", marginLeft: "1rem", width: "20%" }}
              >
                Next
              </Button>
            </Box>
          </div>
        </div>
      </section>
    </>
  );
};

export default PetInfo;
