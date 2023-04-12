import axios from "axios";

const BASE_URL = "http://localhost:3001";
const apiClient = {};

apiClient.signup = async (user) => {
  try {
    const response = await axios.post(`${BASE_URL}/signup`, user);
    return response.data;
  } catch (error) {
    const { data } = error.response;
    return data.msg;
  }
};

apiClient.signin = async (user) => {
  try {
    const response = await axios.post(`${BASE_URL}/signin`, user);
    return response.data;
  } catch (error) {
    const { data } = error.response;
    return data.msg;
  }
};

apiClient.profile = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    const { data } = error.response;
    return data.msg;
  }
};

export default apiClient;
