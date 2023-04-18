import { useState, useContext, useEffect } from "react";
import apiClient from "../../../ApiServices/ApiClientService";
import {
  Box,
  Paper,
  Typography,
  Button,
  FormControl,
  Checkbox,
  ToggleButton,
  Input,
  IconButton,
  Divider,
} from "@mui/material";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import AnswerBox from "./AnswerBox";
import "./LatestQuestion/LatestQuestion.css";
import AnswerText from "./AnswerText";
import { NewsFeedContext } from "../../NewsFeed/NewsFeed";
import moment from "moment";

const LatestQuestion = () => {
  const { latestQuestion, setLatestQuestion, setPrevQuestion } =
    useContext(NewsFeedContext);
  if (!latestQuestion.votedClients) return <div>Loading...</div>;
  const answered = latestQuestion.isAnswered;
  const date = moment(latestQuestion.postDate).format("MMMM Do YYYY, h:mm a");
  const [upVote, setUpVote] = useState(false);
  const [downVote, setDownVote] = useState(false);
  const [voted, setVoted] = useState(false);

  const userId = localStorage.getItem("userId");
  const questionId = latestQuestion._id;

  const handleLatestUpVote = async (e) => {
    e.preventDefault();
    // toggle the button
    setUpVote(!upVote);
    // send userId to the question votedClients array

    const updatedVotedQuestions = await apiClient.upVoter(questionId, userId);

    setLatestQuestion(updatedVotedQuestions[0]);
    // sort the questions by the number of votes
    const sortedQuestions = updatedVotedQuestions.slice(1).sort((a, b) => {
      return b.votedClients.length - a.votedClients.length;
    });

    // set the sorted questions to the prevQuestions
    setPrevQuestion(sortedQuestions);
  };

  const handleLatestDownVote = (e) => {
    e.preventDefault();
    // too lazy to implement this
    // just toogle the button
    setDownVote(!downVote);
  };

  const checkVoted = () => {
    if (latestQuestion.votedClients.includes(userId)) {
      setVoted(true);
      setUpVote(true);
    }
  };

  return (
    <section className="latest-question-card-container">
      <div className="latest-question-card">
        <Box sx={{ flexGrow: 1 }}>
          <Paper
            elevation={2}
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              width: "35vw",
              height: "72vh",
            }}
          >
            <div className="latest-question-card-header">
              <h2>Question</h2>
              <h4>{latestQuestion.question}</h4>
              <span>
                Asked by <strong>{latestQuestion.clientName}</strong>
              </span>
              <span>
                Posted on <strong>{date}</strong>
              </span>
            </div>
            <Divider />
            <div className="latest-answer-section">
              <div className="latest-answerText">
                {answered ? (
                  <AnswerText answerText={latestQuestion} />
                ) : (
                  <h4>Not Answered Yet....</h4>
                )}
              </div>
            </div>
            <div className="latest-helpful-section">
              <ThumbUpIcon />
              <div className="people">
                {latestQuestion.votedClients.length} people found this answer
                helpful
              </div>
            </div>
            <div className="latest-voting-section">
              <div className="latest-voting">
                <div>WAS THIS ANSWER HELPFUL?</div>
                <div>
                  <IconButton
                    onClick={handleLatestUpVote}
                    disabled={downVote ? true : false}
                  >
                    {upVote ? <ThumbUpIcon /> : <ThumbUpAltOutlinedIcon />}
                  </IconButton>
                  <IconButton
                    onClick={handleLatestDownVote}
                    disabled={upVote ? true : false}
                  >
                    {downVote ? (
                      <ThumbDownIcon />
                    ) : (
                      <ThumbDownOffAltOutlinedIcon />
                    )}
                  </IconButton>
                </div>
              </div>
            </div>
          </Paper>
        </Box>
      </div>
    </section>
  );
};

export default LatestQuestion;
