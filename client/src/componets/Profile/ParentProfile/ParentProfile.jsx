import { useState, useEffect } from 'react'; // Removed useContext
import useUserStore from '../../../store/userStore'; // Import useUserStore
import ProfileSideBar from '../../SideBar/ProfileSideBar/ProfileSideBar';
import ProfileNavBar from '../../NavBar/ProfileNavBar/ProfileNavBar';
import './ParentProfile.css';
import DashboardContainer from '../../Dashboard/DashboardContainer';

const ParentProfile = () => {
  return (
    <section className='parent-profile'>
      <div className='sidebar'>
        <ProfileSideBar />
      </div>
      <div className='main-content'>
        <div className='profile-nav-bar'>
          <ProfileNavBar />
        </div>
        <div className='profile-dashboard'>
          <DashboardContainer />
        </div>
      </div>
    </section>
  );
};

export default ParentProfile;
