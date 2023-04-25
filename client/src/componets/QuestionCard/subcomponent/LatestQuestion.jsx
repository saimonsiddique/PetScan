import { useState, useContext } from "react";
import apiClient from "../../../ApiServices/ApiClientService";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Stack,
  Divider,
} from "@mui/material";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import AnswerBox from "./AnswerBox";
import "./LatestQuestion/LatestQuestion.css";
import AnswerText from "./AnswerText";
import { NewsFeedContext } from "../../NewsFeed/NewsFeed";
import moment from "moment";

const LatestQuestion = () => {
  const { latestQuestion, setLatestQuestion, setPrevQuestion } =
    useContext(NewsFeedContext);
  // if (!latestQuestion.votedClients) return <div>Loading...</div>;
  const answered = latestQuestion.isAnswered;
  const date = moment(latestQuestion.postDate).format("MMMM Do YYYY, h:mm a");
  const [upVote, setUpVote] = useState(false);
  const [downVote, setDownVote] = useState(false);
  const [voted, setVoted] = useState(false);

  const userId = localStorage.getItem("userId");
  const questionId = latestQuestion._id;

  const handleLatestUpVote = async (e) => {
    e.preventDefault();
    // toggle the button
    setUpVote(!upVote);
    // send userId to the question votedClients array

    const updatedVotedQuestions = await apiClient.upVoter(questionId, userId);

    setLatestQuestion(updatedVotedQuestions[0]);
    // sort the questions by the number of votes
    const sortedQuestions = updatedVotedQuestions.slice(1).sort((a, b) => {
      return b.votedClients.length - a.votedClients.length;
    });

    // set the sorted questions to the prevQuestions
    setPrevQuestion(sortedQuestions);
  };

  const handleLatestDownVote = (e) => {
    e.preventDefault();
    // too lazy to implement this
    // just toogle the button
    setDownVote(!downVote);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexGrow: 1,
        mt: 0,
      }}
    >
      <Stack spacing={1} sx={{ width: "100%" }}>
        <Paper
          sx={{
            width: "35vw",
            height: "80vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
            p: 2,
          }}
        >
          <Typography variant="h5" sx={{ mb: 1 }}>
            Question
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 1, fontSize: 20, color: "#001952", fontWeight: "bold" }}
          >
            {latestQuestion.question}
          </Typography>
          <Typography
            variant="body2"
            sx={{ mb: 1, fontSize: 13, color: "#001979" }}
          >
            Asked by <strong>{latestQuestion.clientName}</strong>
          </Typography>
          <Typography
            variant="body2"
            sx={{ mb: 1, fontSize: 13, color: "#001979" }}
          >
            Posted on {date}
          </Typography>
          <Divider sx={{ width: "100%", my: 2 }} />
          {answered && (
            <>
              <Typography
                variant="body2"
                sx={{ mb: 1, fontSize: 13, color: "#001979" }}
              >
                Answered by <strong>{latestQuestion.vetName}</strong>
              </Typography>
              <Typography
                variant="body2"
                sx={{ mb: 1, fontSize: 13, color: "#001979" }}
              >
                Answered on{" "}
                <strong>
                  {moment(latestQuestion.answerDate).format(
                    "MMMM Do YYYY, h:mm a"
                  )}{" "}
                </strong>
              </Typography>
            </>
          )}
          <Box
            sx={{
              display: "flex",
              alignItems: "left",
              p: 2,
            }}
          >
            <AnswerText answerText={latestQuestion} />
          </Box>
          <Divider sx={{ width: "100%", my: 2 }} />
          <Stack direction="row" spacing={0.8} sx={{ mb: 1 }}>
            <ThumbUpIcon />
            {latestQuestion.votedClients ? (
              <Typography
                variant="body2"
                sx={{ fontSize: 16, color: "#001952" }}
              >
                <strong>{latestQuestion.votedClients.length}</strong> people
                found this helpful
              </Typography>
            ) : null}
          </Stack>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 1,
              backgroundColor: "#3A87AD",
              color: "white",
            }}
          >
            {answered ? (
              <>
                <Typography variant="body2" sx={{ fontSize: 14 }}>
                  WAS THIS ANSWER HELPFUL?
                </Typography>
                <IconButton
                  sx={{ ml: 1 }}
                  aria-label="upvote"
                  onClick={handleLatestUpVote}
                  disabled={downVote}
                >
                  {upVote ? <ThumbUpIcon /> : <ThumbUpAltOutlinedIcon />}
                </IconButton>
                <IconButton
                  sx={{ ml: 1 }}
                  aria-label="downvote"
                  onClick={handleLatestDownVote}
                  disabled={upVote}
                >
                  {downVote ? (
                    <ThumbDownIcon />
                  ) : (
                    <ThumbDownOffAltOutlinedIcon />
                  )}
                </IconButton>
              </>
            ) : (
              <Typography variant="body2" sx={{ fontSize: 14 }}>
                Helpful votes are not available for unanswered questions
              </Typography>
            )}
          </Box>
        </Paper>
      </Stack>
    </Box>
  );
};

export default LatestQuestion;
