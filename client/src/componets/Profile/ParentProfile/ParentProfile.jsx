import { useState, useEffect } from "react";
import apiClient from "../../../ApiServices/ApiClientService";
import {
  Box,
  Paper,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import LayersIcon from "@mui/icons-material/Layers";
import PetsIcon from "@mui/icons-material/Pets";
import MedicationRoundedIcon from "@mui/icons-material/MedicationRounded";
import SettingsApplicationsSharpIcon from "@mui/icons-material/SettingsApplicationsSharp";
import AddLocationSharpIcon from "@mui/icons-material/AddLocationSharp";
import navLogo from "../../../../public/Homepage/parent-nav.jpg";
import "./ParentProfile.css";
import ProfileSideBar from "../../SideBar/ProfileSideBar/ProfileSideBar";
import ProfileNavBar from "../../NavBar/ProfileNavBar/ProfileNavBar";
import BookAppointment from "../subcomponents/ProfileContent/BookAppointment";
import PetCard from "../subcomponents/ProfileContent/PetCard";
import AppointmentCard from "../subcomponents/ProfileContent/AppointmentCard";

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

  return (
    <section className="parent-profile">
      <div className="sidebar">
        <img src={navLogo} alt="" className="side-logo-parent" />
        <ProfileSideBar />
      </div>
      <div className="main-content">
        <div className="profile-nav-bar">
          <ProfileNavBar />
        </div>
        <div className="profile-dashboard">
          <Box
            sx={{
              display: "flex",
              "& > :not(style)": {
                m: 0,
                width: "100%",
                height: "100%",
              },
            }}
          >
            <Paper elevation={4}>
              <div className="appointment">
                <BookAppointment />
              </div>
              <div className="my-pets">
                <div>
                  <span>
                    <h3>My Pets</h3>
                  </span>
                </div>
                <div className="pet-card">
                  <PetCard />
                </div>
              </div>
              <div className="appointment-lists">
                <div>
                  <span>
                    <h3>Upcoming Appointments</h3>
                  </span>
                </div>
                <div className="appointment-cards">
                  <AppointmentCard />
                </div>
              </div>
            </Paper>
          </Box>
        </div>
      </div>
    </section>
  );
};

export default ParetProfile;
