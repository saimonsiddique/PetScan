import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

const Appointments = (props) => {
  const { appointment } = props;
  // console.log("appointment", appointment);

  return (
    <Card
      sx={{
        maxWidth: 250,
        m: 1,
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={appointment.vetProfile ? appointment.vetProfile : null}
          alt="Your Vet Profile"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {appointment.vetName ? appointment.vetName : appointment.status}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {appointment.concern
              ? appointment.concern
              : "For the concern of..."}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Appointments;
