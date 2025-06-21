import apiClientInstance from '../api/axiosInstance';

const apiService = {};

apiService.signin = async (user) => {
  // The interceptor will handle response.data and error messages
  // console.log(error) was here, can be re-added in UI if needed
  return apiClientInstance.post('/signin', user);
};

export default apiService;
