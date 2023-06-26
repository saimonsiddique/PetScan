import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const apiService = {};

apiService.signin = async (user) => {
  try {
    const response = await axios.post(`${BASE_URL}/signin`, user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    const { data } = response;
    return data.msg;
  }
};

export default apiService;
