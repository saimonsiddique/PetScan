import { Box, Stack, Badge, Paper, Typography, Button } from "@mui/material";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";

const StepTwo = (props) => {
  const { badgeValue, concern } = props;
  console.log("StepTwo", badgeValue);
  return (
    <Stack direction="row" spacing={2}>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          margin: "1rem",
          alignItems: "center",
          width: 100,
          height: 100,
        }}
      >
        <Badge
          badgeContent={
            badgeValue === concern ? <CheckCircleOutlinedIcon /> : ""
          }
          sx={{ width: 80, height: 80 }}
        >
          <Typography component={"span"} sx={{ mt: 2, mb: 2, py: 2 }}>
            {concern}
          </Typography>
        </Badge>
      </Paper>
    </Stack>
  );
};

export default StepTwo;
