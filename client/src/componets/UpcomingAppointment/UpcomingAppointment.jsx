import { Box, Button, Typography, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
const UpcomingAppointment = (props) => {
  const { appointment } = props;
  // console.log("appointment", appointment);
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "left",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "50vw",
          height: "max-content",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            mb: 1,
            color: "#42389D",
            fontSize: 15,
            ml: 1,
          }}
        >
          {appointment.clientEmail}
        </Typography>
        {/* <Typography
          variant="body1"
          sx={{
            mb: 1,
            color: "#42389D",
            fontSize: 15,
            ml: 12,
          }}
        >
          {appointment.petName}
        </Typography> */}
        <Typography
          variant="body1"
          sx={{
            mb: 1,
            color: "#42389D",
            fontSize: 15,
            ml: 12,
          }}
        >
          {appointment.concern}
        </Typography>
        <Button
          variant="contained"
          sx={{
            mb: 1,
            fontSize: 15,
            ml: 10,
          }}
          onClick={() => navigate(`/form`)}
        >
          Add Prescription
        </Button>
      </Box>
      <Divider sx={{ width: "100%", my: 2 }} />
    </Box>
  );
};

export default UpcomingAppointment;
