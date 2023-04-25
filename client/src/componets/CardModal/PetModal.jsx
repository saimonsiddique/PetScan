import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

const PetModal = ({ handleClose, open, pet }) => {
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Avatar
                alt={pet.petName}
                src={pet.petPhoto}
                sx={{ width: 100, height: 100 }}
              />
              <Typography variant="h5" component="h2" sx={{ mt: 1 }}>
                {pet.petName}
              </Typography>
              <Typography
                variant="body1"
                component="p"
                sx={{ mt: 1, fontWeight: "bold" }}
              >
                {pet.petSpecies}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "left",
                }}
              >
                <Typography variant="body1" component="p" sx={{ mt: 1 }}>
                  <strong>Weight</strong> : {pet.petWeight} {pet.weightUnit}
                </Typography>
                <Typography variant="body1" component="p" sx={{ mt: 1 }}>
                  <strong>Age</strong> : {pet.petAge} {pet.ageUnit}
                </Typography>
                <Typography variant="body1" component="p" sx={{ mt: 1 }}>
                  <strong>Gender</strong> : {pet.petGender}
                </Typography>
                <Typography variant="body1" component="p" sx={{ mt: 1 }}>
                  <strong>PrevMedicalHistory</strong> :
                  {pet.prevMedicalHistory ? pet.prevMedicalHistory : " None"}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default PetModal;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "35%",
  height: "50%",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
};
