import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../Pages/Dashboard";
import { Box, Paper } from "@mui/material";
import BookAppointment from "../Profile/subcomponents/ProfileContent/BookAppointment";
import PetCard from "../Profile/subcomponents/ProfileContent/PetCard";
import AppointmentCard from "../Profile/subcomponents/ProfileContent/AppointmentCard";
const initialState = {
  email: "",
  firstName: "",
  lastName: "",
  pets: [],
  appointments: [],
};

const DashboardContainer = () => {
  const [state, setState] = useState(initialState);
  const { parent } = useContext(UserContext);
  // retrieve parent data from context
  useEffect(() => {
    setState({
      email: parent.email,
      firstName: parent.firstName,
      lastName: parent.lastName,
      pets: parent.pets,
      appointments: parent.appointments,
    });
  }, [parent]);

  // console.log("parent", state.pets.length);

  return (
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
      <Paper elevation={2}>
        <div className="appointment">
          <BookAppointment />
        </div>
        <div className="my-pets">
          <div>
            <span>
              <h3>{parent.firstName}'s Pets</h3>
            </span>
          </div>
          <div className="pet-card">
            {state.pets.length > 0 ? (
              state.pets.map((pet) => {
                {
                  // console.log("map func", pet);
                }
                return <PetCard key={pet} pet={pet} />;
              })
            ) : (
              <div className="no-pets">
                <h3>You have no pets</h3>
              </div>
            )}
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
  );
};

export default DashboardContainer;
