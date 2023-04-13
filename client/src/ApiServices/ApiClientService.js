import axios from "axios";

const BASE_URL = "http://localhost:3001";
const apiClient = {};

apiClient.signup = async (user) => {
  try {
    await axios
      .post(`${BASE_URL}/signup/petParent`, user, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("res", res);
        return res.data;
      });
  } catch (error) {
    const { data } = error.response;
    return data.msg;
  }
};

apiClient.profile = async (token) => {
  try {
    await axios
      .get(`${BASE_URL}/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("res", res);
        return res.data.json();
      });
  } catch (error) {
    const { data } = error.response;
    return data.msg.json();
  }
};

export default apiClient;
