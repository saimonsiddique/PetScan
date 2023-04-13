import axios from "axios";

const BASE_URL = "http://localhost:3001";

const apiService = {};

apiService.signin = async (user) => {
  try {
    await axios
      .post(`${BASE_URL}/signin`, user, {
        headers: {
          "Content-Type": "application/json",
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
