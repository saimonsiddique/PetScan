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
import "./QuestionCard.css";
import AnswerBox from "./subcomponent/AnswerBox";
import AnswerText from "./subcomponent/AnswerText";
import { NewsFeedContext } from "../NewsFeed/NewsFeed";

const QuestionCard = (props) => {
  const { answerBox } = useContext(NewsFeedContext);
  const { question, date } = props;
  const answered = question.isAnswered;
  const [upVote, setUpVote] = useState(question.upVotes);
  const [downVote, setDownVote] = useState(question.downVotes);

  const handleUpVote = () => {
    setUpVote(!voted);
    setUpVote(upVote + 1);
  };

  const handleDownVote = () => {
    setDownVote(upVote - 1);
  };

  const handleSubmit = async () => {
    e.preventDefault();
  };

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
              <div className="people">108 people found this answer helpful</div>
            </div>
            <div className="voting-section">
              <div className="voting">
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

export default QuestionCard;
