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
  Input,
  IconButton,
  Divider,
} from "@mui/material";
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
    <div>
      <FormControl
        sx={{
          m: "1rem",
          width: "80%",
          justifyContent: "center",
        }}
      >
        <Input
          sx={{
            width: "100%",
            height: "100%",
            fontSize: "1.25rem",
            textAlign: "center",
          }}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Answer the question..."
        />
      </FormControl>
      <Button
        sx={{
          m: "1rem",
          width: "30%",
          justifyContent: "center",
        }}
        variant="contained"
        color="success"
        onClick={handleSubmit}
      >
        Answer
      </Button>
    </div>
  );
};

export default AnswerBox;
