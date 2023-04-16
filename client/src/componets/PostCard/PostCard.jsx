import apiClient from "../../ApiServices/ApiClientService";
import { useState, useContext } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  FormControl,
  ToggleButton,
  OutlinedInput,
  TextField,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import InputUnstyled, { inputUnstyledClasses } from "@mui/base/InputUnstyled";
import { styled } from "@mui/system";
import "./PostCard.css";
import { NewsFeedContext } from "../NewsFeed/NewsFeed";

const PostCard = () => {
  const [question, setQuestion] = useState("");
  const accessToken = localStorage.getItem("accessToken");

  const { allQuestions, setAllQuestions, setLatestQuestion } =
    useContext(NewsFeedContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(question);
    const newQuestion = {
      question: question,
      postDate: new Date(),
    };
    const response = await apiClient.postQuestion(accessToken, newQuestion);
    setAllQuestions([...allQuestions, newQuestion]);
    setLatestQuestion(newQuestion);
    // reset the form
    setQuestion("");
    setSelected(false);
  };

  return (
    <section className="post-question-container">
      <div className="post-question-header">
        <Paper
          elevation={1}
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "22vw",
            margin: "0.5rem 0",
          }}
        >
          <h2>Post a Question</h2>
          <TextField
            sx={{ width: "100%", mt: 2, mb: 1 }}
            label="Post a Question"
            variant="outlined"
            value={question}
            multiline
            maxRows={4}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <Button
            variant="contained"
            sx={{ mt: 2, mb: 1 }}
            onClick={handleSubmit}
          >
            Ask
          </Button>
        </Paper>
      </div>
    </section>
  );
};

export default PostCard;
