import { useState, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Divider,
  Button,
} from "@mui/material";

const PrescriptionForm = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Paper
        sx={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 2,
          m: 2,
        }}
        elevation={3}
      >
        <Typography
          variant="h5"
          sx={{
            mb: 1,
            color: "#42389D",
            fontWeight: "bold",
            fontSize: 30,
          }}
        >
          Prescription Form
        </Typography>
        <Divider sx={{ width: "100%", my: 2 }} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "left",
            width: "100%",
            height: "100%",
          }}
        >
          <Typography
            variant="h5"
            sx={{ mb: 0.5, color: "#42389D", fontWeight: "bold" }}
          >
            Pet Owner Information
          </Typography>
        </Box>
        <Divider sx={{ width: "100%", my: 2 }} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "left",
            width: "100%",
            height: "100%",
          }}
        >
          <Typography variant="body1" sx={{ mb: 0.5 }}>
            Name : <strong>Saimon Siddiquee</strong>
          </Typography>
          <Typography variant="body1" sx={{ mb: 0.5 }}>
            Email : <strong>saimonsiddiquee@gmail.com</strong>
          </Typography>
          <Divider sx={{ width: "100%", my: 2 }} />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "left",
            width: "100%",
            height: "100%",
          }}
        >
          <Typography
            variant="h5"
            sx={{ mb: 0.5, color: "#42389D", fontWeight: "bold" }}
          >
            Pet Information
          </Typography>
        </Box>
        <Divider sx={{ width: "100%", my: 2 }} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "left",
            width: "100%",
            height: "100%",
          }}
        >
          <Typography variant="body1" sx={{ mb: 0.5 }}>
            Name : <strong>Meaow</strong>
          </Typography>
          <Typography variant="body1" sx={{ mb: 0.5 }}>
            Species :{" "}
            <strong>
              <em>Cat</em>
            </strong>
          </Typography>
          <Typography variant="body1" sx={{ mb: 0.5 }}>
            Age : <strong>1 years</strong>
          </Typography>
          <Typography variant="body1" sx={{ mb: 0.5 }}>
            Weight : <strong>1 kg</strong>
          </Typography>
          <Typography variant="body1" sx={{ mb: 0.5 }}>
            Neutered : <strong>No</strong>
          </Typography>
          <Typography variant="body1" sx={{ mb: 0.5 }}>
            Previous Medical History : <strong>None</strong>
          </Typography>
          <Typography variant="body1" sx={{ mb: 0.5 }}>
            Concern : <strong>None</strong>
          </Typography>
          <Divider sx={{ width: "100%", my: 2 }} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
              height: "100%",
              backgroundColor: "#f5f5f5",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                width: "20%",
                height: "20%",
              }}
            >
              <img
                src={"../../../public/Homepage/logo.png"}
                alt="pet"
                style={{ width: "50%", height: "50%", margin: "2rem" }}
              />
            </Box>
            <TextField
              sx={{ width: "50%" }}
              multiline
              rows={4}
              placeholder="Enter your suggestion here"
            />
            <Button
              sx={{ width: "20%", height: "20%", margin: "2rem" }}
              variant="contained"
              onAbort={() => {
                setOpen(true);
                navigate("/dashboard");
              }}
            >
              Send
            </Button>
            <Snackbar
              open={open}
              autoHideDuration={2000}
              onClose={() => setOpen(false)}
            >
              <Alert onClose={() => setOpen(false)} severity="success">
                Prescription sent successfully!
              </Alert>
            </Snackbar>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default PrescriptionForm;

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
