import { useState, createContext, useEffect, useContext } from 'react'; // useContext is still needed for VetStepsContext
import apiVet from '../../ApiServices/ApiVetServices';
import { Box, Paper } from '@mui/material';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import VetStepOne from '../MultiStepForm/StepOne/VetStepOne';
import './VetSteps.css';
import VetStepTwo from '../MultiStepForm/StepTwo/VetStepTwo';
import VetStepThree from '../MultiStepForm/StepThree/VetStepThree';
import useImageStore from '../../store/imageStore'; // Import useImageStore

const steps = ['About', 'Credentials', 'Verification'];

const vetSteps = [<VetStepOne />, <VetStepTwo />, <VetStepThree />];

export const VetStepsContext = createContext(null);

const VetSteps = () => {
  const { image } = useImageStore(); // Use useImageStore
  const [activeStep, setActiveStep] = useState(0);
  const [postNominal, setPostNominal] = useState('');
  const [specializedField, setSpecializedFields] = useState([]);
  const [licenseNumber, setLicenseNumber] = useState('');
  const [education, setEducation] = useState('');
  const [year, setYear] = useState(0);
  const [phone, setPhone] = useState('');
  const [accountCreate, setAccountCreate] = useState(false);

  const acessToken = localStorage.getItem('accessToken');
  const fullName = localStorage.getItem('fullName');
  const email = localStorage.getItem('email');

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
        vetProfile: image, // image from useImageStore
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
      // Assuming navigate is defined elsewhere or this needs to be adjusted
      // For now, commenting out as navigate is not defined in the provided snippet
      // navigate("/signup");
      console.warn(
        'accessToken is not available, navigation to signup might be needed.'
      );
    }
  }, [acessToken]); // Added acessToken to dependency array

  // handleReset is not defined in the provided snippet, so it would cause an error if All steps completed.
  const handleReset = () => {
    setActiveStep(0);
    // Potentially reset other state variables as well
  };

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
      <div className='vet-steps-container'>
        <Paper
          sx={{
            width: '85%',
            m: '3rem',
            p: 4,
          }}
          elevation={0}
        >
          <Box sx={{ width: '100%' }}>
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
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Box sx={{ flex: '1 1 auto' }} />
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
