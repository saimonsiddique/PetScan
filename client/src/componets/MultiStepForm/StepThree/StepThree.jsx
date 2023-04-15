import { Box, Paper } from "@mui/material";
import { InlineWidget } from "react-calendly";

const StepThree = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <InlineWidget
        url="https://calendly.com/saimonsiddiquee/30min"
        styles={{
          width: "60vw",
          height: "50vh",
          overflow: "hidden",
          overflowY: "scroll",
        }}
      />
    </Box>
  );
};

export default StepThree;
