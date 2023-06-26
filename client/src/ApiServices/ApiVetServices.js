import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const apiVet = {};

apiVet.signup = async (user) => {
  try {
    const response = await axios.post(`${BASE_URL}/signup/vet`, user);
    return response.data;
  } catch (error) {
    console.log(error);
    const { data } = response;
    return data.msg;
  }
};

apiVet.vetInfo = async (accessToken, vetInfo) => {
  try {
    const response = await axios.post(`${BASE_URL}/vet/info`, vetInfo, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    const { data } = response;
    return data.msg;
  }
};

apiVet.profile = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/profile/vet`, {
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

apiVet.postAnswer = async (token, answer) => {
  try {
    const response = await axios.post(`${BASE_URL}/vet/postAnswer`, answer, {
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

apiVet.getInfo = async (token, appointmentInfo) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/vet/getInfo`,
      appointmentInfo,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    const { data } = response;
    return data.msg;
  }
};

apiVet.sendPrescription = async (token, prescription) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/prescription`,
      prescription,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log(error);
    const { data } = response;
    return data.msg;
  }
};

export default apiVet;
