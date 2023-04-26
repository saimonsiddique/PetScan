import {
  Box,
  Stack,
  Badge,
  Paper,
  Typography,
  Button,
  Card,
} from "@mui/material";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";

const StepTwo = (props) => {
  const { badgeValue, concern } = props;

  return (
    <Stack direction="row" spacing={2}>
      <Card
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "1rem",
          width: 100,
          height: 100,
          ":hover": {
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            transform: "scale(1.05)",
            transition: "all 0.3s ease-in-out",
          },
        }}
      >
        <Badge
          badgeContent={
            badgeValue === concern ? <CheckCircleOutlinedIcon /> : ""
          }
          sx={{ width: 80, height: 80 }}
        >
          <Typography component={"span"} sx={{ alignItems: "center", mt: 3 }}>
            {concern}
          </Typography>
        </Badge>
      </Card>
    </Stack>
  );
};

export default StepTwo;
