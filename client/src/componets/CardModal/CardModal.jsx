import { useState, useContext } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { List, ListItem } from "@mui/material";
import { InfomationContext } from "../../Pages/Meet";

const CardModal = (props) => {
  const { handleSubmit, setVetSelected } = useContext(InfomationContext);
  const { vet } = props;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Details</Button>
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
                sx={{ mb: 1, objectFit: "cover" }}
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
              <Typography variant="body1" color="text.secondary">
                Specialized in : {vet.specializedField.join(", ")}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                <Typography variant="body1" color="text.secondary">
                  Top Services : {vet.topRatedFor.join(", ")}
                </Typography>
              </Typography>
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                sx={{ mt: 2, mr: 1 }}
                onClick={() => {
                  setVetSelected(vet._id);
                  handleSubmit();
                }}
              >
                Book Appointment
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default CardModal;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "25%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
