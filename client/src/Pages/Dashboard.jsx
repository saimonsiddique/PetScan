import { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import apiClient from '../ApiServices/ApiClientService';
import apiVet from '../ApiServices/ApiVetServices';
import ParentProfile from '../componets/Profile/ParentProfile/ParentProfile';
import VetProfile from '../componets/Profile/VetProfile/VetProfile';
import useUserStore from '../store/userStore'; // Import useUserStore

const initialParentState = {
  firstName: '',
  lastName: '',
  email: '',
  profilePicture: '',
  pets: [],
  prescriptions: [],
  appointments: [],
  bookedAppointments: [],
  askedQuestions: [],
};

const initialVetState = {
  firstName: '',
  lastName: '',
  email: '',
  vetProfile: '',
  specializedField: [],
  appointments: [],
  topRatedFor: [],
  answeredQuestions: [],
  upcomingAppointments: [],
};

const Dashboard = () => {
  const [parent, setParent] = useState(initialParentState);
  const [vet, setVet] = useState(initialVetState);
  // questionQuery and setQuestionQuery are removed from context.
  // If needed by children, pass as props or use a separate store.
  // const [questionQuery, setQuestionQuery] = useState(false);
  const [loading, setLoading] = useState(true);
  const userType = localStorage.getItem('userType');
  const { setUser } = useUserStore(); // Get setUser from the store

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (userType === 'petParent') {
      const getParent = async () => {
        try {
          const parentInfo = await apiClient.profile(accessToken);
          if (parentInfo) {
            setParent(parentInfo); // Set local state
            setUser(parentInfo); // Update Zustand store
            setLoading(false);
          } else {
            alert('Something went wrong');
            setLoading(false);
          }
        } catch (error) {
          console.log(error);
          alert('Not authorized');
          setLoading(false);
        }
      };
      getParent();
    }

    if (userType === 'vet') {
      const getVet = async () => {
        try {
          const vetInfo = await apiVet.profile(accessToken);
          if (vetInfo) {
            setVet(vetInfo); // Set local state
            setUser(vetInfo); // Update Zustand store
            setLoading(false);
          } else {
            alert('Something went wrong');
            setLoading(false);
          }
        } catch (error) {
          console.log(error);
          alert('Not authorized');
          setLoading(false);
        }
      };
      getVet();
    }
  }, [userType, setUser]); // Add setUser to dependency array

  if (loading) {
    return <CircularProgress />;
  }

  // console.log("First state vet", vet); // vet state is local, user is in store
  // console.log("User from store", useUserStore.getState().user);

  return (
    <>
      {userType === 'petParent' && <ParentProfile />}
      {userType === 'vet' && <VetProfile />}
    </>
  );
};

export default Dashboard;
