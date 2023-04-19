import { Box, Paper, Typography, TextField } from "@mui/material";

const PrescriptionForm = () => {
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
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          p: 2,
          mt: 2,
        }}
      >
        <Typography variant="h2" sx={{ mb: 1 }}>
          Pet Prescription Form
        </Typography>
        <Typography variant="h5" sx={{ mb: 1 }}>
          Pet Owner Details
        </Typography>
        <TextField
          sx={{ width: "100%" }}
          id="outlined-basic"
          label="Name"
          variant="outlined"
        />
        <TextField
          sx={{ width: "100%" }}
          id="outlined-basic"
          label="Email"
          variant="outlined"
        />

        <Typography variant="h5" sx={{ mb: 1 }}>
          Pet Details
        </Typography>
        <TextField
          sx={{ width: "100%" }}
          id="outlined-basic"
          label="Name"
          variant="outlined"
        />
        <TextField
          sx={{ width: "100%" }}
          id="outlined-basic"
          label="Species"
          variant="outlined"
        />
        <TextField
          sx={{ width: "100%" }}
          id="outlined-basic"
          label="Breed"
          variant="outlined"
        />
        <TextField
          sx={{ width: "100%" }}
          id="outlined-basic"
          label="Concerns"
          variant="outlined"
        />
        <TextField
          sx={{ width: "100%" }}
          id="outlined-basic"
          label="Medications"
          variant="outlined"
        />
      </Paper>
    </Box>
  );
};

export default PrescriptionForm;
