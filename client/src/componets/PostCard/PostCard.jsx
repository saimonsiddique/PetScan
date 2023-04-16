import apiClient from "../../ApiServices/ApiClientService";
import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  FormControl,
  ToggleButton,
  OutlinedInput,
} from "@mui/material";
import Textarea from "@mui/joy/Textarea";
import CheckIcon from "@mui/icons-material/Check";
import InputUnstyled, { inputUnstyledClasses } from "@mui/base/InputUnstyled";
import { styled } from "@mui/system";
import "./PostCard.css";

const PostCard = () => {
  const [question, setQuestion] = useState("");
  const [selected, setSelected] = useState(false);
  const accessToken = localStorage.getItem("accessToken");

  const requestAIsuggestion = () => {
    setSelected(!selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(question);
    const newQuestion = {
      question: question,
      aiSuggestion: selected,
      date: new Date(),
    };
    const response = await apiClient.postQuestion(accessToken, newQuestion);
    console.log(response);
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
          <FormControl
            sx={{
              width: "100%",
              justifyContent: "center",
              margin: "0.5rem 0",
            }}
          >
            <Textarea
              sx={{
                width: "100%",
                height: "12vh",
                border: "1px solid #8AD0AE",
                borderRadius: "10px",
                padding: "0.5rem",
              }}
              placeholder="Ask your question here"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </FormControl>
          <div className="ai-suggesstions">
            <span>Do you want AI suggestions?</span>
            <ToggleButton
              sx={{
                ml: 2,
                padding: 0,
                "&.Mui-selected": {
                  backgroundColor: "#8AD0AE",
                  color: "#fff",
                },
                "&.Mui-selected:hover": {
                  backgroundColor: "red",
                  color: "#fff",
                },
              }}
              value="check"
              selected={selected}
              onChange={requestAIsuggestion}
            >
              <CheckIcon />
            </ToggleButton>
          </div>
          <Button
            variant="contained"
            sx={{ mt: 2, mb: 1 }}
            onClick={handleSubmit}
          >
            Post
          </Button>
        </Paper>
      </div>
    </section>
  );
};

export default PostCard;
