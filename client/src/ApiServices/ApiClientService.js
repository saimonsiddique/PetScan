import apiClientInstance from '../api/axiosInstance';

const apiClient = {};

apiClient.signup = async (user) => {
  // The interceptor will handle response.data and error messages
  return apiClientInstance.post('/signup/petParent', user);
};

apiClient.profile = async (token) => {
  return apiClientInstance.get('/profile/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

apiClient.addPet = async (pet, token) => {
  return apiClientInstance.post('/pet/add', pet, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

apiClient.petInfo = async (token) => {
  return apiClientInstance.get('/pet/info', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

apiClient.findVet = async (accessToken, vet) => {
  return apiClientInstance.post('/vet/find', vet, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

apiClient.createAppointment = async (accessToken, appointment) => {
  // console.log(response) was here, can be re-added in UI if needed
  return apiClientInstance.post('/appointment/book', appointment, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

apiClient.postQuestion = async (accessToken, question) => {
  return apiClientInstance.post('/question/add', question, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

apiClient.getFeedQuestions = async () => {
  // console.log(response.data) was here, can be re-added in UI if needed
  return apiClientInstance.get('/feed');
};

apiClient.deleteQuestion = async (userId, questionId) => {
  // console.log(response.data) was here, can be re-added in UI if needed
  return apiClientInstance.post(`/question/${questionId}`, {
    userId, // request body
  });
};

apiClient.upVoter = async (questionId, userId) => {
  // console.log(response.data) was here, can be re-added in UI if needed
  return apiClientInstance.post('/upvotes', {
    questionId,
    userId,
  });
};

export default apiClient;
