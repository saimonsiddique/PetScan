import { useState, useEffect } from "react";
import apiClient from "../../../ApiServices/ApiClientService";
import "./ParentProfile.css";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  pets: [],
};

const ParetProfile = () => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const getUser = async () => {
      const parentInfo = await apiClient.profile(accessToken);
      if (parentInfo) {
        const { firstName, lastName, email, pets } = parentInfo;
        setState((prevState) => ({
          ...prevState,
          firstName,
          lastName,
          email,
          pets,
        }));
      } else {
        alert("Something went wrong");
      }
    };
    getUser(accessToken);
  }, []);

  return <div>ParentProfile</div>;
};

export default ParetProfile;
