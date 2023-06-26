import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
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

apiClient.findVet = async (accessToken, vet) => {
  try {
    const response = await axios.post(`${BASE_URL}/vet/find`, vet, {
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

apiClient.postQuestion = async (accessToken, question) => {
  try {
    const response = await axios.post(`${BASE_URL}/question/add`, question, {
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

apiClient.getFeedQuestions = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/feed`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    const { data } = response;
    return data.msg;
  }
};

apiClient.deleteQuestion = async (userId, questionId) => {
  try {
    const response = await axios.post(`${BASE_URL}/question/${questionId}`, {
      userId,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    const { data } = response;
    return data.msg;
  }
};

apiClient.upVoter = async (questionId, userId) => {
  try {
    const response = await axios.post(`${BASE_URL}/upvotes`, {
      questionId,
      userId,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    const { data } = response;
    return data.msg;
  }
};

export default apiClient;
