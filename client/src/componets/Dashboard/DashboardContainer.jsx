import { useContext } from "react";
import { UserContext } from "../../Pages/Dashboard";
import { Box, Paper } from "@mui/material";
import BookAppointment from "../Profile/subcomponents/ProfileContent/BookAppointment";
import PetCard from "../Profile/subcomponents/ProfileContent/PetCard";
import AppointmentCard from "../Profile/subcomponents/ProfileContent/AppointmentCard";
import QuestionLog from "../Profile/subcomponents/ProfileContent/QuestionLog";
import "./DashboardContainer.css";

const DashboardContainer = () => {
  const { parent, vet, questionQuery, setQuestionQuery } =
    useContext(UserContext);
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
              <div className="no-appointment">
                <h3>You have no appointments</h3>
              </div>
            )}
          </div>
          <div className="my-pets">
            <div>
              <span>
                <h3>
                  {userType === "petParent"
                    ? `${parent.firstName}'s Pets`
                    : `${vet.firstName}'s Patients`}
                </h3>
              </span>
            </div>
            <div className="pet-card">
              {parent.pets.length > 0 ? (
                parent.pets.map((pet) => {
                  {
                    console.log("map func", pet);
                  }
                  return <PetCard key={pet._id} pet={pet} />;
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
                  <h3>My Answers</h3>
                </div>
                {vet.answeredQuestions.map((question, index) => {
                  return <QuestionLog key={question._id} question={question} />;
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
