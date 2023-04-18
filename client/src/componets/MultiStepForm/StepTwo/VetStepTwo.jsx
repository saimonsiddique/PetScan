import { useContext } from "react";
import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import InputAdornment from "@mui/material/InputAdornment";

import { VetStepsContext } from "../../VetSteps/VetSteps";

const VetStepTwo = () => {
  const { setLicenseNumber, setEducation, setYear, setPhone, handleSubmit } =
    useContext(VetStepsContext);

  const handleLicenseNumber = (e) => {
    setLicenseNumber(e.target.value);
  };

  const handleEducation = (e) => {
    setEducation(e.target.value);
  };

  const handleYear = (e) => {
    setYear(e.target.value);
  };

  const handlePhone = (e) => {
    setPhone(e.target.value);
  };

  return (
    <Paper
      sx={{
        p: "2rem",
        display: "flex",
        borderRadius: "1rem",
        flexDirection: "column",
        justifyContent: "left",
        height: "75vh",
      }}
      elevation={2}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "left",
        }}
      >
        <AssignmentTurnedInIcon
          sx={{
            fontSize: 30,
            color: "#3f51b5",
            display: "flex",
            margin: "0",
          }}
        />
        <Typography variant="h5">Add your licenses</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "left",
        }}
      >
        <Typography variant="body1">
          Please Enter your details. We will use this information to create your
          profile and verify your license.
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "left",
          mt: 2,
        }}
      >
        <Typography
          variant="body1"
          sx={{
            display: "flex",
            mb: 1,
          }}
        >
          Enter Your License Number
        </Typography>
        <TextField
          sx={{ width: "40%" }}
          label="License Number"
          variant="outlined"
          onChange={handleLicenseNumber}
          required
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "left",
          mt: 2,
        }}
      >
        <Typography
          variant="body1"
          sx={{
            display: "flex",
            mb: 1,
          }}
        >
          Education
        </Typography>
        <Box
          sx={{
            display: "flex",
          }}
        >
          <TextField
            sx={{ width: "40%" }}
            label="Education"
            variant="outlined"
            onChange={handleEducation}
            required
          />
          <TextField
            sx={{
              width: "40%",
              ml: 2,
            }}
            onChange={handleYear}
            type="number"
            label="Passing Year"
            variant="outlined"
            required
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              display: "flex",
              mt: 2,
              mr: 2,
            }}
          >
            Your Phone Number
          </Typography>
          <TextField
            sx={{
              width: "40%",
              mt: 2,
            }}
            label="Phone Number"
            variant="outlined"
            onChange={handlePhone}
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIphoneIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            m: 2,
            justifyContent: "flex-end",
          }}
        >
          <Button
            sx={{
              width: "10%",
              mt: 2,
              mr: 2,
            }}
            type="submit"
            variant="contained"
            onClick={handleSubmit}
          >
            Add
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default VetStepTwo;
