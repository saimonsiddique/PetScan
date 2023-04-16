import { useState, useContext } from "react";
import apiVet from "../../../ApiServices/ApiVetServices";
import {
  Box,
  Paper,
  Typography,
  Button,
  FormControl,
  Checkbox,
  ToggleButton,
  IconButton,
  Divider,
  TextField,
} from "@mui/material";
import "../subcomponent/AnswerBox/AnswerBox.css";
import { NewsFeedContext } from "../../NewsFeed/NewsFeed";
const AnswerBox = (props) => {
  const { value } = props;
  const [answer, setAnswer] = useState("");
  const [answered, setAnswered] = useState(false);
  const accessToken = localStorage.getItem("accessToken");

  const { setNotAnsweredQuestions } = useContext(NewsFeedContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // update the question with the answer
    const newAnswer = {
      questionId: value._id,
      answer: answer,
    };
    // update the state
    setAnswered(true);
    // post the answer to the database
    const response = await apiVet.postAnswer(accessToken, newAnswer);
    console.log("response from answerbox postanswer", response);
    // update the state of answered questions

    // reset the form
    setAnswer("");
    setNotAnsweredQuestions(response);
  };
  return (
    <section className="answer-box">
      <div className="answer-area">
        <TextField
          sx={{ width: "40vw", mt: 2, mb: 1 }}
          label="Answer the question"
          variant="outlined"
          value={answer}
          multiline
          maxRows={4}
          onChange={(e) => setAnswer(e.target.value)}
        />
      </div>
      <div className="button-submit-answer">
        <Button
          sx={{
            m: "0.5rem",
            width: "25%",
            justifyContent: "center",
          }}
          variant="contained"
          color="success"
          onClick={handleSubmit}
        >
          Answer
        </Button>
      </div>
    </section>
  );
};

export default AnswerBox;
