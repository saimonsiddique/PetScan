import { useNavigate } from "react-router-dom";
import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const VetStepThree = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/feed");
  };
  return (
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
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flexGrow: 1,
          }}
        >
          <CheckCircleIcon
            sx={{
              fontSize: 100,
              color: "#2E7D32",
              display: "flex",
              margin: "0",
            }}
          />
          <Typography variant="h5">You're all set!</Typography>
          <Typography variant="body1">
            You can now set using our platform.
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "#ED6C02",
              }}
            >
              We will verify your license and send you an email once it's
              approved and you can access your dashboard.
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 2,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleNavigate}
            >
              Go to Newsfeed
            </Button>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default VetStepThree;
