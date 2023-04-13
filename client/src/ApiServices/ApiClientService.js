import axios from "axios";

const BASE_URL = "http://localhost:3001";
const apiClient = {};

apiClient.signup = async (user) => {
  try {
    const response = await axios.post(`${BASE_URL}/signup/petParent`, user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    const { data } = response;
    return data.msg;
  }
};

apiClient.profile = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    const { data } = response;
    return data.msg;
  }
};

apiClient.addPet = async (pet, token) => {
  try {
    const response = await axios.post(`${BASE_URL}/pet/add`, pet, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    const { data } = response;
    return data.msg;
  }
};

export default apiClient;
