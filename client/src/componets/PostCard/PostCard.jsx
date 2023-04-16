import apiClient from "../../ApiServices/ApiClientService";
import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  FormControl,
  Checkbox,
  ToggleButton,
} from "@mui/material";
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
        <Box sx={{ flexGrow: 1 }}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "40vw",
            }}
          >
            <h2>Post a Question</h2>
            <FormControl
              sx={{
                m: "1rem 5rem 1rem 20rem",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <Input
                sx={{
                  width: "100%",
                  justifyContent: "center",
                }}
                placeholder="Ask a question..."
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
        </Box>
      </div>
    </section>
  );
};

export default PostCard;

const Input = styled(InputUnstyled)(
  ({ theme }) => `
  
  display: inline-block;

  .${inputUnstyledClasses.input} {
    width: 17rem;
    height: 1.5rem;
    font-size: 0.875rem;
    font-family: IBM Plex Sans, sans-serif;
    font-weight: 400;
    line-height: 1.5;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : grey[50]};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[300]};
    border-radius: 8px;
    padding: 12px 12px;

    &:hover {
      background: ${theme.palette.mode === "dark" ? "" : grey[100]};
      border-color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
    }

    &:focus {
      outline: 3px solid ${
        theme.palette.mode === "dark" ? blue[600] : blue[100]
      };
    }
  }

  &.filled .${inputUnstyledClasses.input} {
    box-shadow: 0 0 2px 2px rgba(125, 200, 0, 0.25);
  }
`
);

const OkMark = styled("span")`
  margin-left: 8px;
  margin-top: 10px;
  position: absolute;
  color: rgba(125, 200, 0, 1);
`;

const blue = {
  100: "#DAECFF",
  200: "#80BFFF",
  400: "#3399FF",
  600: "#0072E5",
};

const grey = {
  50: "#F3F6F9",
  100: "#E7EBF0",
  200: "#E0E3E7",
  300: "#CDD2D7",
  400: "#B2BAC2",
  500: "#A0AAB4",
  600: "#6F7E8C",
  700: "#3E5060",
  800: "#2D3843",
  900: "#1A2027",
};
