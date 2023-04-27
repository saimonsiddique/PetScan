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
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";

const PrescriptionForm = ({ handleClose, open, appointment }) => {
  console.log("PrescriptionForm appointment", appointment);
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Paper
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              elevation={0}
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
                  Name : <strong>{appointment.clientName}</strong>
                </Typography>
                <Typography variant="body1" sx={{ mb: 0.5 }}>
                  Email : <strong>{appointment.email}</strong>
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
                  Name : <strong>{appointment.petName}</strong>
                </Typography>
                <Typography variant="body1" sx={{ mb: 0.5 }}>
                  Species :{" "}
                  <strong>
                    <em>{appointment.pet.petSpecies}</em>
                  </strong>
                </Typography>
                <Typography variant="body1" sx={{ mb: 0.5 }}>
                  Age :{" "}
                  <strong>{`${appointment.pet.petAge} ${appointment.pet.ageUnit}`}</strong>
                </Typography>
                <Typography variant="body1" sx={{ mb: 0.5 }}>
                  Weight :{" "}
                  <strong>{`${appointment.pet.petWeight} ${appointment.pet.weightUnit}`}</strong>
                </Typography>
                <Typography variant="body1" sx={{ mb: 0.5 }}>
                  Neutered : <strong>No</strong>
                </Typography>
                <Typography variant="body1" sx={{ mb: 0.5 }}>
                  Previous Medical History :{" "}
                  <strong>
                    {appointment.pet.previousMedicalHistory !== ""
                      ? "None"
                      : appointment.pet.previousMedicalHistory}
                  </strong>
                </Typography>
                <Typography variant="body1" sx={{ mb: 0.5 }}>
                  Concern : <strong>{appointment.concern}</strong>
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
                      height: "65%",
                    }}
                  >
                    <img
                      src={"../../../public/Homepage/logo.png"}
                      alt="pet"
                      style={{
                        width: "100%",
                        height: "100%",
                        margin: "1rem",
                      }}
                    />
                  </Box>
                  <TextField
                    sx={{ width: "50%", backgroundColor: "#ffffff" }}
                    multiline
                    rows={4}
                    placeholder="Enter your suggestion here"
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "20%",
                      height: "100%",
                    }}
                  >
                    <Button
                      sx={{ width: "80%", height: "25%", m: 1 }}
                      variant="contained"
                    >
                      Send
                    </Button>
                    <Button
                      sx={{ width: "80%", height: "25%", m: 1, p: 1 }}
                      variant="contained"
                      color="error"
                      onClick={handleClose}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default PrescriptionForm;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  height: "100%",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
};
