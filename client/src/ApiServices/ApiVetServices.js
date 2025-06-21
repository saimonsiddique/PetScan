import apiClientInstance from '../api/axiosInstance';

const apiVet = {};

apiVet.signup = async (user) => {
  // console.log(error) was here
  return apiClientInstance.post('/signup/vet', user);
};

apiVet.vetInfo = async (accessToken, vetInfo) => {
  return apiClientInstance.post('/vet/info', vetInfo, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

apiVet.profile = async (token) => {
  return apiClientInstance.get('/profile/vet', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

apiVet.postAnswer = async (token, answer) => {
  return apiClientInstance.post('/vet/postAnswer', answer, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

apiVet.getInfo = async (token, appointmentInfo) => {
  // For GET requests, parameters are usually sent as query params, not in the body.
  // Assuming appointmentInfo should be query parameters.
  // If appointmentInfo is large or sensitive, the backend API might expect a POST or have a different GET structure.
  // For now, passing it as config.params which is typical for GET requests with axios.
  return apiClientInstance.get('/vet/getInfo', {
    params: appointmentInfo, // Changed from direct second argument to params object
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

apiVet.sendPrescription = async (token, prescription) => {
  // console.log(error) was here
  return apiClientInstance.post('/prescription', prescription, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default apiVet;
