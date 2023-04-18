import { Box, List, ListItemButton, ListItemText } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const QuestionLog = (props) => {
  const { question, index } = props;
  const answeredTrack = question.isAnswered;
  console.log(question);
  return (
    <Box
      sx={{
        display: "flex",
        "& > :not(style)": {
          m: 0,
          width: "100%",
          height: "100%",
        },
      }}
    >
      <List>
        <ListItemButton
          sx={{
            borderRadius: "10px",
            backgroundColor: question.isAnswered ? "#35A854" : "#ffffff",
          }}
        >
          <ListItemText
            sx={{
              paddingLeft: "4%",
            }}
            primaryTypographyProps={{
              fontSize: "1.2rem",
              fontFamily: "Roboto",
            }}
            primary={`${index + 1}. ${question.question}`}
            secondary={`Answer: ${question.answer}`}
          />
          <DeleteForeverIcon />
        </ListItemButton>
      </List>
    </Box>
  );
};

export default QuestionLog;
