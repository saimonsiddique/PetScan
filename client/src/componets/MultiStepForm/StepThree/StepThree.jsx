import { Box, Paper } from "@mui/material";
import { InlineWidget, useCalendlyEventListener } from "react-calendly";

const StepThree = () => {
  useCalendlyEventListener({
    onProfilePageViewed: (e) => console.log("onProfilePageViewed", e),
    onDateAndTimeSelected: (e) => console.log("onDateAndTimeSelected", e),
    onEventTypeViewed: (e) => console.log("onEventTypeViewed", e),
    onEventScheduled: (e) => console.log(e.data.payload),
  });
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
