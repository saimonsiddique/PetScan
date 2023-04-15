import { useState, useEffect } from "react";
import { createContext } from "react";
import { CircularProgress } from "@mui/material";
import apiClient from "../ApiServices/ApiClientService";
import apiVet from "../ApiServices/ApiVetServices";
import ParetProfile from "../componets/Profile/ParentProfile/ParentProfile";
import VetProfile from "../componets/Profile/VetProfile/VetProfile";

export const UserContext = createContext(null);

const initialParentState = {
  firstName: "",
  lastName: "",
  email: "",
  pets: [],
  appointments: [],
};

const initialVetState = {
  firstName: "",
  lastName: "",
  email: "",
  specializedIn: [],
  appointments: [],
};

const Dashboard = () => {
  const [parent, setParent] = useState(initialParentState);
  const [vet, setVet] = useState(initialVetState);
  const [loading, setLoading] = useState(true);
  const userType = localStorage.getItem("userType");

  useEffect(() => {
    // get accessToken and userType from local storage
    const accessToken = localStorage.getItem("accessToken");
    // if the user is a parent
    if (userType === "petParent") {
      // get the parent profile
      const getParent = async () => {
        try {
          const parentInfo = await apiClient.profile(accessToken);
          if (parentInfo) {
            const { firstName, lastName, email, pets, appointments } =
              parentInfo;
            setParent((prevState) => ({
              ...prevState,
              firstName,
              lastName,
              email,
              pets,
              appointments,
            }));
            setLoading(false);
          } else {
            alert("Something went wrong");
          }
        } catch (error) {
          console.log(error);
          alert("Not authorized");
        }
      };
      getParent(accessToken);
    }

    // if the user is a vet
    if (userType === "vet") {
      // get the vet profile
      const getVet = async () => {
        try {
          const vetInfo = await apiVet.profile(accessToken);
          if (vetInfo) {
            const { firstName, lastName, email, specializedIn, appointments } =
              vetInfo;
            setVet((prevState) => ({
              ...prevState,
              firstName,
              lastName,
              email,
              specializedIn,
              appointments,
            }));
            setLoading(false);
          } else {
            alert("Something went wrong");
          }
        } catch (error) {
          console.log(error);
          alert("Not authorized");
        }
      };
      getVet(accessToken);
    }
  }, []);

  if (loading) {
    return <CircularProgress />;
  }
  return (
    <UserContext.Provider value={{ parent, vet }}>
      {userType === "petParent" && <ParetProfile />}
      {userType === "vet" && <VetProfile />}
    </UserContext.Provider>
  );
};

export default Dashboard;
