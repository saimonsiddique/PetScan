import { Avatar, Stack, Typography, Card } from "@mui/material";
const StepOne = (props) => {
  const { pet } = props;

  return (
    <Stack direction="row" spacing={2}>
      <Card
        sx={{
          p: "2rem",
          display: "flex",
          borderRadius: "1rem",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "12vw",
          height: "12vw",
          ":hover": {
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            transform: "scale(1.05)",
            transition: "all 0.3s ease-in-out",
          },
        }}
      >
        <Avatar
          sx={{ width: 80, height: 80 }}
          alt={pet.petName}
          src={pet.petPhoto}
        />
        <Typography component={"span"} sx={{ mt: 2, mb: 2, py: 2 }}>
          <h6>{pet.petName.toUpperCase()}</h6>
        </Typography>
      </Card>
    </Stack>
  );
};

export default StepOne;
