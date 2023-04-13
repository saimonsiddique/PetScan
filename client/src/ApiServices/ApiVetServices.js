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
    await axios
      .get(`${BASE_URL}/vet`, {
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
