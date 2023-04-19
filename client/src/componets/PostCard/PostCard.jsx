import React from "react";
import apiClient from "../../ApiServices/ApiClientService";
import { useState, useContext } from "react";
import { Paper, Button, TextField } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";

import "./PostCard.css";
import { NewsFeedContext } from "../NewsFeed/NewsFeed";

const categories = ["Cat", "Dog", "Bird", "Fish", "General"];
const categoriesSelected = [false, false, false, false, false];

const PostCard = () => {
  const [question, setQuestion] = useState("");
  const [success, setSuccess] = useState(false);
  const [category, setCategory] = useState([]);
  const [categorySelected, setCategorySelected] = useState(categoriesSelected);
  const accessToken = localStorage.getItem("accessToken");

  const { setLatestQuestion, setPrevQuestion, latestQuestion, prevQuestion } =
    useContext(NewsFeedContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(question);
    const newQuestion = {
      category: category[0],
      question: question,
      postDate: new Date(),
    };
    const response = await apiClient.postQuestion(accessToken, newQuestion);
    console.log(response);
    // set prevQuestion
    setPrevQuestion([latestQuestion, ...prevQuestion]);
    setLatestQuestion(response);
    // reset the form
    setQuestion("");
    setSuccess(true);
    setCategorySelected(categoriesSelected);
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
            required
            onChange={(e) => setQuestion(e.target.value)}
          />
          <Stack
            direction="row"
            spacing={0.5}
            flexWrap={"wrap"}
            sx={{ width: "100%", mt: 1.5, mb: 1 }}
          >
            <Chip
              label="Cat"
              color={categorySelected[0] ? "primary" : "default"}
              onClick={() => {
                setCategorySelected([
                  !categorySelected[0],
                  categorySelected[1],
                  categorySelected[2],
                  categorySelected[3],
                  categorySelected[4],
                ]);
                if (categorySelected[0]) {
                  setCategory(category.filter((item) => item !== "Cat"));
                } else {
                  setCategory([...category, "Cat"]);
                }
              }}
            />
            <Chip
              label="Dog"
              color={categorySelected[1] ? "primary" : "default"}
              onClick={() => {
                setCategorySelected([
                  categorySelected[0],
                  !categorySelected[1],
                  categorySelected[2],
                  categorySelected[3],
                  categorySelected[4],
                ]);
                if (categorySelected[1]) {
                  setCategory(category.filter((item) => item !== "Dog"));
                } else {
                  setCategory([...category, "Dog"]);
                }
              }}
            />
            <Chip
              label="Bird"
              color={categorySelected[2] ? "primary" : "default"}
              onClick={() => {
                setCategorySelected([
                  categorySelected[0],
                  categorySelected[1],
                  !categorySelected[2],
                  categorySelected[3],
                  categorySelected[4],
                ]);
                if (categorySelected[2]) {
                  setCategory(category.filter((item) => item !== "Bird"));
                } else {
                  setCategory([...category, "Bird"]);
                }
              }}
            />
            <Chip
              label="General"
              color={categorySelected[4] ? "primary" : "default"}
              onClick={() => {
                setCategorySelected([categorySelected.map]);
                if (categorySelected[4]) {
                  setCategory(category.filter((item) => item !== "General"));
                } else {
                  setCategory([...category, "General"]);
                }
              }}
            />
          </Stack>
          <Button
            variant="contained"
            sx={{ mt: 2, mb: 1 }}
            onClick={handleSubmit}
          >
            Ask
          </Button>
          <Snackbar
            open={success}
            autoHideDuration={2000}
            onClose={() => setSuccess(false)}
          >
            <Alert onClose={() => setSuccess(false)} severity="success">
              Question posted successfully!
            </Alert>
          </Snackbar>
        </Paper>
      </div>
    </section>
  );
};

export default PostCard;

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
