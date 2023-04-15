import { useNavigate } from "react-router-dom";

import {
  Box,
  Paper,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import VideocamIcon from "@mui/icons-material/Videocam";
import appointmentImg from "../images/appointment.jpg";

const BookAppointment = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/book-appointment");
  };
  return (
    <section className="appointment-card">
      <Card
        sx={{
          maxWidth: 400,
        }}
      >
        <CardMedia
          component="img"
          height="150"
          image={appointmentImg}
          sx={{ objectFit: "contain" }}
          alt="Meet your vet"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            Book Appointment
            <VideocamIcon
              sx={{
                fontSize: 30,
                color: "#3f51b5",
                marginLeft: "5rem",
              }}
            />
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Looking for a personal one-on-one appointment with a vet? We’ve got
            you covered.
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            sx={{
              backgroundColor: "#42389D",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#3f51b5",
              },
              textTransform: "none",
            }}
            onClick={handleClick}
          >
            Book appointment
          </Button>
        </CardActions>
      </Card>
    </section>
  );
};

export default BookAppointment;
