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
    const response = await axios.get(`${BASE_URL}/profile/me`, {
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

apiClient.petInfo = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/pet/info`, {
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

apiClient.createAppointment = async (accessToken, appointment) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/appointment/book`,
      appointment,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    const { data } = response;
    return data.msg;
  }
};

export default apiClient;
