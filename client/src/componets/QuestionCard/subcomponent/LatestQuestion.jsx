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
import AnswerBox from "./AnswerBox";
import "./LatestQuestion/LatestQuestion.css";
import AnswerText from "./AnswerText";

const LatestQuestion = () => {
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
              height: "max-content",
            }}
          >
            <div className="latest-question-card-header">
              <h2>Question</h2>
              <h4>Should cats with kidney disease be fed a specific diet?</h4>
              <span>
                Asked by <strong>Saimon Siddique</strong>
              </span>
              <span>Posted on Date</span>
            </div>
            <Divider />
            <div className="latest-answer-section">
              <div className="latest-answerText">
                <AnswerText />
              </div>
              <div className="latest-answerBox">
                <Divider />
                <AnswerBox />
              </div>
            </div>
            <div className="latest-helpful-section">
              <ThumbUpIcon />
              <div className="people">108 people found this answer helpful</div>
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
