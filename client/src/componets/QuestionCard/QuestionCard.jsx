import { useState } from "react";
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

const QuestionCard = () => {
  const [upVote, setUpVote] = useState(false);
  const [downVote, setDownVote] = useState(false);

  const handleUpVote = () => {
    setUpVote(!upVote);
  };

  const handleDownVote = () => {
    setDownVote(!downVote);
  };

  const handleSubmit = async () => {
    e.preventDefault();
  };

  return (
    <section className="question-card-container">
      <div className="question-card">
        <Box sx={{ flexGrow: 1 }}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
              width: "40vw",
            }}
          >
            <div className="question-card-header">
              <h2>Question</h2>
              <h4>Should cats with kidney disease be fed a specific diet?</h4>
              <span>
                Asked by <strong>Saimon Siddique</strong>
              </span>
              <span>Posted on Date</span>
            </div>
            <Divider />
            <div className="question-answer">
              <AnswerBox />
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
