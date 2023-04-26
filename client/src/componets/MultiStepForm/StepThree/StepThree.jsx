import { PopupWidget, useCalendlyEventListener } from "react-calendly";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import VetCard from "../../VetCard/VetCard";

const StepThree = ({
  matchedVet,
  vetSelected,
  setVetSelected,
  handleSubmit,
}) => {
  const navigate = useNavigate();
  useCalendlyEventListener({
    // onProfilePageViewed: () => console.log("onProfilePageViewed"),
    onDateAndTimeSelected: () => console.log("onDateAndTimeSelected"),
    onEventTypeViewed: () => console.log("onEventTypeViewed"),
    onEventScheduled: (e) => {
      handleSubmit();
      navigate("/success");
      console.log("onEventScheduled", e);
    },
  });

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        {matchedVet.map((vet) => {
          return (
            <VetCard
              key={vet._id}
              vet={vet}
              setVetSelected={setVetSelected}
              handleSubmit={handleSubmit}
              vetSelected={vetSelected}
            />
          );
        })}
      </Box>
      {/* <Box
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
      </Box> */}
    </>
  );
};

export default StepThree;
