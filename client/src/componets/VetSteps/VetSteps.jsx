import { useState, createContext, useEffect, useContext } from "react";
import apiVet from "../../ApiServices/ApiVetServices";
import { Box, Paper } from "@mui/material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import VetStepOne from "../MultiStepForm/StepOne/VetStepOne";
import "./VetSteps.css";
import VetStepTwo from "../MultiStepForm/StepTwo/VetStepTwo";
import VetStepThree from "../MultiStepForm/StepThree/VetStepThree";
import { ImageContext } from "../../App";

const steps = ["About", "Credentials", "Verification"];

const vetSteps = [<VetStepOne />, <VetStepTwo />, <VetStepThree />];

export const VetStepsContext = createContext(null);

const VetSteps = () => {
  const { image } = useContext(ImageContext);
  const [activeStep, setActiveStep] = useState(0);
  const [postNominal, setPostNominal] = useState("");
  const [specializedField, setSpecializedFields] = useState([]);
  const [licenseNumber, setLicenseNumber] = useState("");
  const [education, setEducation] = useState("");
  const [year, setYear] = useState(0);
  const [phone, setPhone] = useState("");
  const [accountCreate, setAccountCreate] = useState(false);

  const acessToken = localStorage.getItem("accessToken");
  const fullName = localStorage.getItem("fullName");
  const email = localStorage.getItem("email");

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleSubmit = () => {
    try {
      const vetInfo = {
        postNominal,
        specializedField,
        licenseNumber,
        education,
        year,
        phone,
        vetProfile: image,
      };
      const response = apiVet.vetInfo(acessToken, vetInfo);
      console.log(response);
      setAccountCreate(true);
      // call handle next
      handleNext();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // check if accessToken is valid
    if (!acessToken) {
      navigate("/signup");
    }
  }, []);

  return (
    <VetStepsContext.Provider
      value={{
        email,
        fullName,
        handleNext,
        setPostNominal,
        setSpecializedFields,
        setLicenseNumber,
        setEducation,
        setYear,
        setPhone,
        handleSubmit,
      }}
    >
      <div className="vet-steps-container">
        <Paper
          sx={{
            width: "85%",
            m: "3rem",
            p: 4,
          }}
          elevation={0}
        >
          <Box sx={{ width: "100%" }}>
            <Stepper activeStep={activeStep}>
              {/* Show all the steps from steps array */}
              {steps.map((label, index) => {
                return (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            {activeStep === steps.length ? (
              <>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  All steps completed - you&apos;re finished
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button onClick={handleReset}>Reset</Button>
                </Box>
              </>
            ) : (
              <>{vetSteps[activeStep]}</>
            )}
          </Box>
        </Paper>
      </div>
    </VetStepsContext.Provider>
  );
};

export default VetSteps;
