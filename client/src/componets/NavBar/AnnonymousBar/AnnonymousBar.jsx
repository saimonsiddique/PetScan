import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Tooltip,
  Avatar,
  Typography,
  Button,
} from "@mui/material";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";

const AnnonymousBar = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box>
        <AppBar
          style={{
            backgroundColor: "#42389D",
            boxShadow: 0,
          }}
          elevation={0}
        >
          <Toolbar>
            <Box sx={{ flexGrow: 1, display: "flex" }}>
              <Button
                color="inherit"
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  fontSize: "1.5rem",
                  width: "30%",
                  height: "100%",
                }}
                onClick={() => navigate("/")}
              >
                <img
                  src="../../../..//Homepage/petscan-removebg-preview.png"
                  alt="logo"
                  style={{
                    height: "100%",
                    width: "15%",
                    color: "white",
                  }}
                  sx={{ display: { xs: "none", sm: "block" } }}
                />
                PetScan
              </Button>
            </Box>
            <Tooltip title="Register">
              <IconButton
                size="large"
                color="inherit"
                onClick={() => navigate("/register")}
              >
                <AssignmentIndIcon
                  sx={{
                    fontSize: "2rem",
                    ":hover": {
                      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                      transform: "scale(1.05)",
                      transition: "all 0.3s ease-in-out",
                    },
                  }}
                  style={{ color: "white" }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Question Feed">
              <IconButton size="larger" onClick={() => navigate("/feed")}>
                <NewspaperIcon
                  sx={{
                    fontSize: "2rem",
                    ":hover": {
                      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                      transform: "scale(1.05)",
                      transition: "all 0.3s ease-in-out",
                    },
                  }}
                  style={{ color: "white" }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="SignIn">
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={() => navigate("/signin")}
              >
                <Avatar
                  src={""}
                  sx={{
                    width: 40,
                    height: 40,
                    ":hover": {
                      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                      transform: "scale(1.05)",
                      transition: "all 0.3s ease-in-out",
                    },
                  }}
                />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default AnnonymousBar;
