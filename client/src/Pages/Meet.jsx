import { createContext, useEffect, useState } from "react";
import apiClient from "../ApiServices/ApiClientService";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Stepper,
  Step,
  StepButton,
  Typography,
  Button,
  Paper,
  IconButton,
} from "@mui/material";
import { CircularProgress } from "@mui/material";
import StepOne from "../componets/MultiStepForm/StepOne/StepOne";
import StepTwo from "../componets/MultiStepForm/StepTwo/StepTwo";
import StepThree from "../componets/MultiStepForm/StepThree/StepThree";
import ProfileNavBar from "../componets/NavBar/ProfileNavBar/ProfileNavBar";
import Success from "../componets/Success/Success";

export const InfomationContext = createContext(null);

const steps = [
  "Who is this appointment for?",
  "What is your Concern?",
  "Book an Appointment",
];

const concerns = ["Vaccination", "Dental", "Skin", "Behavioral", "Other"];

const meetSteps = [<StepOne />, <StepTwo />, <StepThree />];

const Meet = () => {
  let navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [petInfo, setPetInfo] = useState([]);
  const [selectedConcern, setSelectedConcern] = useState([]);
  const [selectedPet, setSelectedPet] = useState("");
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleBacktoDashboard = () => {
    window.location.href = "/dashboard";
  };

  const handleConcern = (concern) => {
    setSelectedConcern(concern);
  };

  const handleSelectedPet = (pet) => {
    setSelectedPet(pet.petName);
  };

  // Check if the user is logged in
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      window.location.href = "/signin";
    }
    const getPetInfo = async () => {
      try {
        const petInfo = await apiClient.petInfo(accessToken);
        if (petInfo) {
          setPetInfo(petInfo.pets);
        } else {
          alert("Something went wrong");
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        alert("Not authorized");
      }
    };
    getPetInfo(accessToken);
  }, []);

  const handleSubmit = async (data) => {
    const accessToken = localStorage.getItem("accessToken");
    const appointmentData = {
      petName: selectedPet,
      concern: selectedConcern,
    };
    console.log(appointmentData);
    try {
      const appointment = await apiClient.createAppointment(
        accessToken,
        appointmentData
      );
      if (appointment) {
        navigate("/success");
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      alert("Not authorized");
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <InfomationContext.Provider value={{ concerns }}>
      <section className="meet-container">
        <div className="meet-nav-bar">
          <ProfileNavBar />
        </div>
        <div className="meet-step-container">
          <Box sx={{ width: "75%", padding: "1.5rem" }}>
            <Stepper nonLinear activeStep={activeStep}>
              {steps.map((label, index) => (
                <Step key={label} completed={completed[index]}>
                  <StepButton color="inherit" onClick={handleStep(index)}>
                    {label}
                  </StepButton>
                </Step>
              ))}
            </Stepper>
            <div>
              {allStepsCompleted() ? (
                <>
                  <Paper
                    square
                    elevation={0}
                    sx={{
                      p: 3,
                      margin: "0 auto",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: 400,
                      height: 400,
                    }}
                  >
                    <Typography component={"span"} sx={{ mt: 2, mb: 1 }}>
                      <Success />
                    </Typography>
                  </Paper>
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button onClick={handleBacktoDashboard}>
                      Go to Dashboard
                    </Button>
                  </Box>
                </>
              ) : (
                <>
                  <div className="meet-steps">
                    <Typography
                      component={"span"}
                      sx={{
                        mt: 2,
                        mb: 2,
                        py: 2,
                        display: "flex",
                        padding: "1rem",
                      }}
                    >
                      {activeStep === 1
                        ? concerns.map((concern, index) => {
                            return (
                              <IconButton
                                sx={{
                                  margin: "0.5rem",
                                  padding: "0.5rem",
                                  borderRadius: "0.5rem",
                                }}
                                onClick={() => handleConcern(concern)}
                                key={index}
                              >
                                <StepTwo
                                  key={index}
                                  concern={concern}
                                  badgeValue={selectedConcern}
                                />{" "}
                              </IconButton>
                            );
                          })
                        : activeStep === 0
                        ? petInfo.map((pet, index) => {
                            return (
                              <IconButton
                                sx={{
                                  padding: "0.5rem",
                                  borderRadius: "0.5rem",
                                  border:
                                    selectedPet === pet.petName
                                      ? "2px solid #1FC600"
                                      : "none",
                                }}
                                onClick={() => handleSelectedPet(pet)}
                                key={index}
                              >
                                <StepOne
                                  key={index}
                                  pet={pet}
                                  badgeValue={selectedPet}
                                />
                              </IconButton>
                            );
                          })
                        : meetSteps[activeStep]}
                    </Typography>
                  </div>
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Button
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Back
                    </Button>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button onClick={handleNext} sx={{ mr: 1 }}>
                      Next
                    </Button>
                    {activeStep === 2 && (
                      <Button
                        variant="contained"
                        onClick={handleSubmit}
                        sx={{ mr: 1 }}
                      >
                        Submit
                      </Button>
                    )}
                  </Box>
                </>
              )}
            </div>
          </Box>
        </div>
      </section>
    </InfomationContext.Provider>
  );
};

export default Meet;
