import { useState, useEffect } from "react";
import apiVet from "../../../ApiServices/ApiClientService";
import "./VetProfile.css";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  specializedIn: [],
};

const VetProfile = () => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const getVet = async () => {
      const vetInfo = await apiVet.profile(accessToken);
      if (vetInfo) {
        const { firstName, lastName, email, specializedIn } = vetInfo;
        setState((prevState) => ({
          ...prevState,
          firstName,
          lastName,
          email,
          specializedIn,
        }));
      } else {
        alert("Something went wrong");
      }
    };
    getVet(accessToken);
  }, []);

  return <div>VetProfile</div>;
};

export default VetProfile;
