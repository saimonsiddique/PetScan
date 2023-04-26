import { useState } from "react";
import { PopupWidget, useCalendlyEventListener } from "react-calendly";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

const CardModal = ({ vet, handleSubmit, vetSelected, setVetSelected }) => {
  // console.log("Card Model vet", vet);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = () => {
    // open the modal
    handleOpen();
    // set the vetSelcted
    setVetSelected(vet);
  };

  return (
    <>
      <Button onClick={handleClick}>Details</Button>
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
                alt={vet.firstName}
                src={vet.vetProfile}
                sx={{ mb: 1, objectFit: "cover", width: 100, height: 100 }}
              />
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                {vet.firstName + " " + vet.lastName}
              </Typography>
            </Box>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Specialized in : {vet.specializedField.join(", ")}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              Top Services : {vet.topRatedFor.join(", ")}
            </Typography>
            {vetSelected && vetSelected._id === vet._id ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  mt: 2,
                }}
              >
                <PopupWidget
                  url="https://calendly.com/saimonsiddiquee/30-minute-meeting-clone"
                  text="Book an Appointment"
                  rootElement={document.getElementById("root")}
                  styles={{
                    m: 2,
                    height: "100%",
                    width: "100%",
                    minWidth: "400px",
                    minHeight: "500px",
                  }}
                />
              </Box>
            ) : null}
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

export default CardModal;

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
