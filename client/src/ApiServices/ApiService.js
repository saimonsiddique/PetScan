import axios from "axios";

const BASE_URL = "http://localhost:3001";

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
