import { useState, useContext, useEffect } from "react";
import apiClient from "../../ApiServices/ApiClientService";
import { Box, Paper, IconButton, Divider } from "@mui/material";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import "./QuestionCard.css";
import AnswerBox from "./subcomponent/AnswerBox";
import AnswerText from "./subcomponent/AnswerText";
import { NewsFeedContext } from "../NewsFeed/NewsFeed";

const QuestionCard = (props) => {
  const { answerBox, setPrevQuestion, setLatestQuestion } =
    useContext(NewsFeedContext);
  const { question, date } = props;
  const [upVote, setUpVote] = useState(false);
  const [downVote, setDownVote] = useState(false);
  const [voted, setVoted] = useState(false);
  const answered = question.isAnswered;
  const userId = localStorage.getItem("userId");

  const questionId = question._id;

  const handleUpVote = async (e) => {
    e.preventDefault();
    // toggle the button
    setUpVote(!upVote);
    // send userId to the question votedClients array
    const updatedVotedQuestions = await apiClient.upVoter(questionId, userId);
    // console.log(response);
    setLatestQuestion(updatedVotedQuestions[0]);
    // sort the questions by the number of votes
    const sortedQuestions = updatedVotedQuestions.slice(1).sort((a, b) => {
      return b.votedClients.length - a.votedClients.length;
    });
    // set the sorted questions to the prevQuestions
    setPrevQuestion(sortedQuestions);
  };

  const handleDownVote = (e) => {
    e.preventDefault();
    // too lazy to implement this
    // just toogle the button
    setDownVote(!downVote);
  };

  const checkVoted = () => {
    if (question.votedClients.includes(userId)) {
      setVoted(true);
      setUpVote(true);
    }
  };

  useEffect(() => {
    checkVoted();
  }, []);

  return (
    <section className="question-card-container">
      <div className="question-card">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexGrow: 1,
            mt: 2,
          }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
              width: "58vw",
              height: "max-content",
            }}
          >
            <div className="question-card-header">
              <h2>Question</h2>
              <h4 align="justify">{question.question}</h4>
              <span>
                Asked by <strong>{question.clientName}</strong>
              </span>
              <span>
                Posted on <strong>{date}</strong>
              </span>
            </div>
            <Divider />
            <div className="answer-section">
              <div className="answerText">
                {answered ? (
                  <AnswerText answerText={question} />
                ) : (
                  <h4>Not Answered Yet....</h4>
                )}
              </div>
              <div className="answerBox">
                <Divider />
                {answerBox ? <AnswerBox value={question} /> : null}
              </div>
            </div>
            <div className="helpful-section">
              <ThumbUpIcon />
              <div className="people">
                {question.votedClients.length} people found this answer helpful
              </div>
            </div>
            {!answerBox ? (
              <div className="voting-section">
                <div className="voting">
                  <div>WAS THIS ANSWER HELPFUL?</div>
                  <div>
                    <IconButton
                      onClick={handleUpVote}
                      disabled={downVote ? true : false}
                    >
                      {upVote ? <ThumbUpIcon /> : <ThumbUpAltOutlinedIcon />}
                    </IconButton>
                    <IconButton
                      onClick={handleDownVote}
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
            ) : null}
          </Paper>
        </Box>
      </div>
    </section>
  );
};

export default QuestionCard;
