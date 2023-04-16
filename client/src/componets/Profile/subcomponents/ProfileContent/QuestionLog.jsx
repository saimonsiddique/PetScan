import { Box, List, ListItemButton, ListItemText } from "@mui/material";

const QuestionLog = (props) => {
  const { question, index } = props;
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
          />
        </ListItemButton>
      </List>
    </Box>
  );
};

export default QuestionLog;
