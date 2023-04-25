import { useContext } from "react";
import { Box, Paper } from "@mui/material";
import { InlineWidget, useCalendlyEventListener } from "react-calendly";
import VetCard from "../../VetCard/VetCard";
import { InfomationContext } from "../../../Pages/Meet";

const StepThree = ({ matchedVet, setVetSelected, handleSubmit }) => {
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
      {matchedVet.map((vet) => {
        return (
          <VetCard
            key={vet._id}
            vet={vet}
            setVetSelected={setVetSelected}
            handleSubmit={handleSubmit}
          />
        );
      })}
    </Box>
  );
};

export default StepThree;
