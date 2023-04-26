import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Tooltip,
  Avatar,
  TextField,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Autocomplete from "@mui/material/Autocomplete";

const categories = ["Cat", "Dog", "Bird", "Fish", "General"];

const HomeNavBar = ({ handleSelect, handleBlur }) => {
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
            <Box sx={{ flexGrow: 1 }}>
              <Autocomplete
                options={categories}
                onSelect={handleSelect}
                onBlur={handleBlur}
                sx={{
                  width: 300,
                  backgroundColor: "white",
                  borderRadius: "10px",
                  "& label.Mui-focused": {
                    color: "black",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search"
                    size="small"
                    variant="outlined"
                  />
                )}
              />
            </Box>
            <Tooltip title="News">
              <IconButton size="larger" onClick={() => navigate("/feed")}>
                <NewspaperIcon style={{ color: "white" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Notifications">
              <IconButton size="large">
                <NotificationsIcon style={{ color: "white" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Profile">
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={() => navigate("/dashboard")}
              >
                <Avatar
                  src="https://res.cloudinary.com/dru7kzv3i/image/upload/v1681975309/vet5_eegd6u.jpg"
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
            <Tooltip title="Logout">
              <IconButton
                size="large"
                color="inherit"
                onClick={() => {
                  localStorage.clear();
                  navigate("/");
                }}
              >
                <LogoutIcon style={{ color: "white" }} />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default HomeNavBar;
