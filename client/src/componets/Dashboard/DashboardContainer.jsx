import { useContext } from "react";
import { UserContext } from "../../Pages/Dashboard";
import { Box, Paper, Typography, Divider } from "@mui/material";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import BookAppointment from "../Profile/subcomponents/ProfileContent/BookAppointment";
import PetCard from "../Profile/subcomponents/ProfileContent/PetCard";
import Appointments from "../Appointments/Appointments";
import QuestionLog from "../Profile/subcomponents/ProfileContent/QuestionLog";
import "./DashboardContainer.css";
import UpcomingAppointment from "../UpcomingAppointment/UpcomingAppointment";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const DashboardContainer = () => {
  const { parent, vet, questionQuery, setQuestionQuery } =
    useContext(UserContext);
  const vetUpcomingAppointments = vet.upcomingAppointments.filter(
    (appointment) => {
      return appointment.status === "Pending";
    }
  );
  console.log("vet", vetUpcomingAppointments);
  const userType = localStorage.getItem("userType");

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
      {!questionQuery ? (
        <Paper elevation={2}>
          <div className="appointment">
            {userType === "petParent" ? (
              <BookAppointment />
            ) : (
              <div className="upcoming-appointments">
                <Typography
                  variant="h5"
                  sx={{
                    mb: 2,
                    color: "#42389D",
                    fontWeight: "bold",
                    fontSize: 30,
                  }}
                >
                  Upcoming Appointments
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    mt: 1,
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 1,
                      color: "#42389D",
                      fontWeight: "bold",
                      fontSize: 17,
                    }}
                  >
                    Pet Parent's Email
                  </Typography>
                  {/* <Typography
                    variant="h5"
                    sx={{
                      mb: 1,
                      color: "#42389D",
                      fontWeight: "bold",
                      fontSize: 17,
                      ml: 10,
                    }}
                  >
                    Pet Name
                  </Typography> */}
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 1,
                      color: "#42389D",
                      fontWeight: "bold",
                      fontSize: 17,
                      ml: 20,
                    }}
                  >
                    Concern
                  </Typography>
                </Box>
                <Divider sx={{ width: "100%", my: 2 }} />
                {vetUpcomingAppointments.length > 0
                  ? vetUpcomingAppointments.map((appointment) => {
                      return (
                        <UpcomingAppointment
                          key={appointment._id}
                          appointment={appointment}
                        />
                      );
                    })
                  : null}
              </div>
            )}
          </div>
          <div className="my-pets">
            <div>
              <span>
                <h3>
                  {userType === "petParent"
                    ? `${parent.firstName}'s Pets`
                    : null}
                </h3>
              </span>
            </div>
            <div className="pet-card">
              <AutoPlaySwipeableViews
                interval={5000}
                enableMouseEvents
                style={{ width: "40%" }}
              >
                {parent.pets.length > 0
                  ? parent.pets.map((pet) => {
                      {
                        console.log("map func", pet);
                      }
                      return <PetCard key={pet._id} pet={pet} />;
                    })
                  : null}
              </AutoPlaySwipeableViews>
            </div>
          </div>
          <div className="appointment-lists">
            {userType === "petParent" ? (
              <div>
                <span>
                  <h3>Upcoming Appointments</h3>
                </span>
              </div>
            ) : null}
            <div className="appointment-cards">
              <AutoPlaySwipeableViews
                interval={2500}
                enableMouseEvents
                style={{ width: "40%" }}
              >
                {parent.bookedAppointments.length > 0
                  ? parent.bookedAppointments.map((appointment) => {
                      return (
                        <Appointments
                          key={appointment._id}
                          appointment={appointment}
                        />
                      );
                    })
                  : null}
              </AutoPlaySwipeableViews>
            </div>
          </div>
        </Paper>
      ) : (
        <Paper elevation={2}>
          <div className="list-of-question-query">
            {userType === "petParent" ? (
              <>
                <div className="heading-question-list">
                  <h3>{parent.firstName}'s Questions</h3>
                </div>
                {parent.askedQuestions.map((question, index) => {
                  return (
                    <QuestionLog
                      key={question._id}
                      question={question}
                      index={index}
                    />
                  );
                })}
              </>
            ) : (
              <>
                <div className="heading-question-list">
                  <h3>{vet.firstName}'s Answers</h3>
                </div>
                {vet.answeredQuestions.map((question, index) => {
                  return (
                    <QuestionLog
                      key={question._id}
                      question={question}
                      index={index}
                    />
                  );
                })}
              </>
            )}
          </div>
        </Paper>
      )}
    </Box>
  );
};

export default DashboardContainer;
