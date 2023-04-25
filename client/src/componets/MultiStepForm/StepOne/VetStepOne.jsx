import { useContext } from "react";
import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MedicationLiquidIcon from "@mui/icons-material/MedicationLiquid";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import { VetStepsContext } from "../../VetSteps/VetSteps";

const VetStepOne = () => {
  const { email, fullName, handleNext, setPostNominal, setSpecializedFields } =
    useContext(VetStepsContext);

  const handlePostNominal = (e) => {
    setPostNominal(e.target.value);
  };

  const handleSpecializedFields = (e) => {
    const fields = e.target.value.split(",");
    setSpecializedFields(fields);
  };

  return (
    <>
      <Paper
        sx={{
          p: "2rem",
          display: "flex",
          borderRadius: "1rem",
          flexDirection: "column",
          justifyContent: "center",
          height: "75vh",
        }}
        elevation={2}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flexGrow: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexGrow: 1,
            }}
          >
            <MedicationLiquidIcon
              sx={{
                fontSize: 30,
                color: "#3f51b5",
                display: "flex",
                margin: "0 0.5rem",
              }}
            />
            <p>Tell us about you</p>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexGrow: 1,
          }}
        >
          <p>
            Please Enter your details. We will use this information to create
            your profile and verify your license.
          </p>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "left",
            mt: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              m: 0.8,
              justifyContent: "left",
              flexGrow: 1,
            }}
          >
            <EmailIcon />
            <Box sx={{ mx: 1 }}>
              <p
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                Email Address
              </p>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
            }}
          >
            <p
              style={{
                fontSize: 16,
                fontWeight: 450,
              }}
            >
              {email}
            </p>
            <LockIcon sx={{ ml: 1, fontSize: 15, color: "#3f51b5" }} />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              m: 1,
              justifyContent: "left",
              flexGrow: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                mt: 2,
                flexGrow: 1,
              }}
            >
              <p
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#42389D",
                }}
              >
                Full Name
              </p>
              <TextField
                sx={{
                  width: "50%",
                  height: "2rem",
                  mt: 1.5,
                }}
                placeholder={fullName}
                disabled={true}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              m: 1,
              justifyContent: "left",
              flexGrow: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                mt: 2,
                flexGrow: 1,
              }}
            >
              <p
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#42389D",
                }}
              >
                Post-Nomial-Letters
              </p>
              <TextField
                sx={{
                  width: "50%",
                  height: "2rem",
                  mt: 1.5,
                }}
                placeholder="e.g. DVM, MRCVS, MVB,"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={handlePostNominal}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              m: 1,
              justifyContent: "left",
              flexGrow: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                mt: 2,
                flexGrow: 1,
              }}
            >
              <p
                component={"span"}
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#42389D",
                }}
              >
                Specialized Fields
              </p>
              <TextField
                sx={{
                  width: "50%",
                  height: "2rem",
                  mt: 1.5,
                }}
                onChange={handleSpecializedFields}
                placeholder="e.g. Cat, Dog, Bird, etc."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              m: 2,
              justifyContent: "flex-end",
              flexGrow: 1,
            }}
          >
            <Button
              sx={{
                width: "20%",
                height: "2rem",
              }}
              variant="outlined"
              onClick={handleNext}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Paper>
    </>
  );
};

export default VetStepOne;
