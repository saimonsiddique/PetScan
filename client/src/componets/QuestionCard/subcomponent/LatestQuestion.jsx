import { useState, useContext } from "react";
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
  const { latestQuestion, answerBox } = useContext(NewsFeedContext);
  const answered = latestQuestion.isAnswered;
  const date = moment(latestQuestion.postDate).format("MMMM Do YYYY, h:mm a");

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
                {latestQuestion.upVotes} people found this answer helpful
              </div>
            </div>
            <div className="latest-voting-section">
              <div className="latest-voting">
                <div>WAS THIS ANSWER HELPFUL?</div>
                <div>
                  <IconButton>
                    <ThumbUpAltOutlinedIcon />
                  </IconButton>
                  <IconButton>
                    <ThumbDownOffAltOutlinedIcon />
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
