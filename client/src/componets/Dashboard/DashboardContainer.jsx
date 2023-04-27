import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../Pages/Dashboard";
import { Box, Paper, Typography, Divider, TextField } from "@mui/material";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import BookAppointment from "../Profile/subcomponents/ProfileContent/BookAppointment";
import PetCard from "../Profile/subcomponents/ProfileContent/PetCard";
import Appointments from "../Appointments/Appointments";
import QuestionLog from "../Profile/subcomponents/ProfileContent/QuestionLog";
import apiClient from "../../ApiServices/ApiClientService";
import DataTable from "../DataTable/DataTable";
import SearchIcon from "@mui/icons-material/Search";

import "./DashboardContainer.css";

// const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const DashboardContainer = () => {
  const { parent, vet, questionQuery, setQuestionQuery } =
    useContext(UserContext);
  const [askedQuestion, setAskedQuestion] = useState([]);
  const [search, setSearch] = useState("");
  const [filterEmail, setFilterEmail] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const vetUpcomingAppointments = vet.upcomingAppointments.filter(
    (appointment) => {
      return appointment.status === "Pending";
    }
  );

  const userType = localStorage.getItem("userType");

  useEffect(() => {
    if (userType === "petParent") {
      setAskedQuestion(parent.askedQuestions);
    } else {
      setAskedQuestion(vet.answeredQuestions);
      setUpcomingAppointments(vetUpcomingAppointments);
      console.log("vetUpcomingAppointments", vet.upcomingAppointments);
    }
  }, [parent, vet, userType]);

  const handleDelete = (questionId) => {
    const userId = localStorage.getItem("userId");

    // call api to delete question

    apiClient.deleteQuestion(userId, questionId).then((res) => {
      console.log("res", res);
    });

    // filter out the question from the askedQuestion array
    const newQuestionQuery = askedQuestion.filter((question) => {
      return question._id !== questionId;
    });

    // set the new questionQuery
    setAskedQuestion(newQuestionQuery);

    console.log("id", questionId);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    const filterData = vetUpcomingAppointments.filter((appointment) => {
      return appointment.clientEmail
        .toLowerCase()
        .includes(search.toLowerCase());
    });
    setFilterEmail(filterData);
    setUpcomingAppointments(filterData);
  };

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
                <Divider />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <DataTable
                    appointments={vetUpcomingAppointments}
                    key={vetUpcomingAppointments._id}
                  />
                  {/* Search Field */}
                  <TextField
                    id="outlined-basic"
                    label="Search"
                    variant="outlined"
                    size="medium"
                    sx={{
                      width: "40%",
                      height: "max-content",
                      mb: 2,
                      mt: "2rem",
                      ml: 2,
                    }}
                    onChange={handleSearch}
                    value={search}
                    InputProps={{
                      endAdornment: (
                        <SearchIcon
                          sx={{
                            color: "#42389D",
                          }}
                        />
                      ),
                    }}
                  />
                </Box>
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
              {
                userType === "petParent" &&
                // <AutoPlaySwipeableViews
                //   interval={5000}
                //   enableMouseEvents
                //   style={{ width: "40%" }}
                // >
                parent.pets.length > 0 ? (
                  parent.pets.map((pet) => {
                    return <PetCard key={pet._id} pet={pet} />;
                  })
                ) : (
                  <h3>No pet found!</h3>
                )
                // </AutoPlaySwipeableViews>
              }
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
              {userType === "petParent" &&
                // <AutoPlaySwipeableViews
                //   interval={2500}
                //   enableMouseEvents
                //   style={{ width: "40%" }}
                //   required={false}
                // >
                (parent.bookedAppointments.length > 0 ? (
                  parent.bookedAppointments.map((appointment) => {
                    return (
                      <Appointments
                        key={appointment._id}
                        appointment={appointment}
                      />
                    );
                  })
                ) : (
                  <h3>No upcoming appointment!</h3>
                ))
                // </AutoPlaySwipeableViews>
              }
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
                {askedQuestion.map((question, index) => {
                  return (
                    <QuestionLog
                      key={question._id}
                      question={question}
                      handleDelete={handleDelete}
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
                {askedQuestion.map((question, index) => {
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
