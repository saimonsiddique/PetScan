import { useState, useEffect, createContext } from "react";
import apiClient from "../../ApiServices/ApiClientService";
import moment from "moment";
import HomeNavBar from "../NavBar/HomeNavBar/HomeNavBar";
import PostCard from "../PostCard/PostCard";
import QuestionCard from "../QuestionCard/QuestionCard";
import LatestQuestion from "../QuestionCard/subcomponent/LatestQuestion";
import BookAppointment from "../Profile/subcomponents/ProfileContent/BookAppointment";
import { Box } from "@mui/material";
import AnnonymousBar from "../NavBar/AnnonymousBar/AnnonymousBar";

export const NewsFeedContext = createContext();

const NewsFeed = () => {
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [allQuestions, setAllQuestions] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");
  const [notAnsweredQuestions, setNotAnsweredQuestions] = useState([]);
  const [latestQuestion, setLatestQuestion] = useState([]);
  const [prevQuestion, setPrevQuestion] = useState([]);
  const [answerBox, setAnswerBox] = useState(false);
  const [postCard, setPostCard] = useState(false);
  const user = localStorage.getItem("userType");

  useEffect(() => {
    (async () => await getAllQuestions())();
    // check if user is logged in
    if (localStorage.getItem("accessToken")) {
      // check if user is a vet or not
      if (user === "vet") {
        setAnswerBox(true);
      } else {
        setPostCard(true);
      }
    }
  }, []);

  const getAllQuestions = async () => {
    console.log("Inside getAllQuestions");
    // get all questions
    const allQuestionsfromDB = await apiClient.getFeedQuestions();
    // set latest question
    setLatestQuestion(allQuestionsfromDB[0]);
    // sort all questions by voteClients length
    let sortedQuestions = allQuestionsfromDB.slice(1).sort((a, b) => {
      return b.votedClients.length - a.votedClients.length;
    });
    // set all questions
    setAllQuestions(sortedQuestions);
    // set previous questions
    setPrevQuestion(sortedQuestions);

    // set all not answered questions
    const answrNotFound = allQuestionsfromDB.filter(
      (question) => question.isAnswered === false
    );
    setNotAnsweredQuestions(answrNotFound);
  };

  const handleSelect = (e) => {
    e.preventDefault();
    setFilterCategory(e.target.value);
    console.log(e.target.value);

    // filter the questions by category
    const filtered = allQuestions.filter(
      (question) => question.category === e.target.value
    );

    console.log(filtered);

    // sort the filtered questions by voteClients length
    const sortedQuestions = filtered.sort((a, b) => {
      return b.votedClients.length - a.votedClients.length;
    });

    console.log(sortedQuestions);

    // set the filtered questions
    setFilteredQuestions(sortedQuestions);

    // set the previous questions
    setPrevQuestion(sortedQuestions);
  };

  const handleBlur = (e) => {
    e.preventDefault();
    setFilterCategory("");
    setFilteredQuestions([]);
    setPrevQuestion(allQuestions);
  };

  return (
    <NewsFeedContext.Provider
      value={{
        latestQuestion,
        setLatestQuestion,
        prevQuestion,
        setPrevQuestion,
        notAnsweredQuestions,
        setNotAnsweredQuestions,
        answerBox,
        postCard,
      }}
    >
      <Box
        sx={{
          backgroundColor: "#F1F3F6",
          minHeight: "100%",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#42389D",
            minHeight: "80%",
            position: "relative",
            m: "4rem",
          }}
        >
          {user ? (
            <HomeNavBar handleSelect={handleSelect} handleBlur={handleBlur} />
          ) : (
            <AnnonymousBar />
          )}
        </Box>
        <Box
          sx={{
            backgroundColor: "#F1F3F6",
            minHeight: "100%",
            position: "relative",
          }}
          className="feed-content-container"
        >
          <Box
            sx={{
              display: "flex",
              backgroundColor: "#F1F3F6",
              minHeight: "100%",
              maxWidth: "80%",
              alignItems: "center",
              justifyContent: "center",
              margin: "auto",
            }}
            className="feed-post"
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#F1F3F6",
                minHeight: "100%",
                m: "1rem",
              }}
              className="post-card"
            >
              {postCard && <PostCard />}
              {!answerBox && <BookAppointment />}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#F1F3F6",
                minHeight: "100%",
              }}
              className="latest-question"
            >
              {!answerBox && <LatestQuestion />}
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#F1F3F6",
              minHeight: "100%",
              maxWidth: "59%",
              alignItems: "center",
              justifyContent: "center",
              margin: "auto",
              position: "relative",
            }}
            className="feed-questions"
          >
            {answerBox
              ? notAnsweredQuestions.map((question) => (
                  <QuestionCard
                    key={question._id}
                    question={question}
                    date={moment(question.postDate).format(
                      "MMMM Do YYYY, h:mm a"
                    )}
                  />
                ))
              : prevQuestion.map((question) => (
                  <QuestionCard
                    key={question._id}
                    question={question}
                    date={moment(question.postDate).format(
                      "MMMM Do YYYY, h:mm a"
                    )}
                  />
                ))}
          </Box>
        </Box>
      </Box>
    </NewsFeedContext.Provider>
  );
};

export default NewsFeed;
