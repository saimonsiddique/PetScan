import { useState, useEffect } from "react";
import apiVet from "../../../ApiServices/ApiVetServices";
import "./VetProfile.css";
import ProfileSideBar from "../../SideBar/ProfileSideBar/ProfileSideBar";
import ProfileNavBar from "../../NavBar/ProfileNavBar/ProfileNavBar";
import DashboardContainer from "../../Dashboard/DashboardContainer";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  specializedIn: [],
};

const VetProfile = () => {
  const [state, setState] = useState(initialState);

  return (
    <section className="vet-dashboard-container">
      <div className="vet-dash-side-bar">
        <ProfileSideBar />
      </div>
      <div className="vet-dash-main">
        <div className="vet-dash-main-header">
          <ProfileNavBar />
        </div>
        <div className="vet-dash-main-content">
          <DashboardContainer />
        </div>
      </div>
    </section>
  );
};

export default VetProfile;
