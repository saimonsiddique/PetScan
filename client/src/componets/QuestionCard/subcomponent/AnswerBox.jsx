import { useState } from "react";
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
} from "@mui/material";
import Textarea from "@mui/joy/Textarea";
import "../subcomponent/AnswerBox/AnswerBox.css";
const AnswerBox = () => {
  const [answer, setAnswer] = useState("");
  const accessToken = localStorage.getItem("accessToken");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newAnswer = {
      questionId: "643b2a568a222ecd7a177b78",
      answer: answer,
      answerDate: new Date(),
    };

    const response = await apiVet.postAnswer(accessToken, newAnswer);
    console.log(response);
    // reset the form
    setAnswer("");
  };
  return (
    <section className="answer-box">
      <div className="answer-area">
        <FormControl
          sx={{
            m: "1rem",
            width: "60%",
            justifyContent: "center",
          }}
        >
          <Textarea
            sx={{
              width: "28vw",
              height: "5rem",
              justifyContent: "center",
            }}
            placeholder="Answer the question here...."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </FormControl>
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
