import {
  Box,
  Paper,
  IconButton,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import "../subcomponent/AnswerText/AnswerText.css";

const AnswerText = (props) => {
  const { answerText } = props;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {answerText.answer ? (
        <Typography
          variant="body2"
          sx={{ mb: 1, fontSize: 24, color: "#001952", textAlign: "justify" }}
        >
          {answerText.answer}
        </Typography>
      ) : (
        <Typography
          variant="body2"
          sx={{ mb: 1, fontSize: 27, color: "#001952" }}
        >
          Not Answered Yet...
        </Typography>
      )}
    </Box>
  );
};

export default AnswerText;
