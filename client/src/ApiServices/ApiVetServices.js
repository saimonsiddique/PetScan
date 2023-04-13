import axios from "axios";

const BASE_URL = "http://localhost:3001";

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

apiVet.profile = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/vet`, {
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

export default apiVet;
