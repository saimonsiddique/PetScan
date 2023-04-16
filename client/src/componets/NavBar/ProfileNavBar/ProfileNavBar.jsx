import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Tooltip,
  Avatar,
} from "@mui/material";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import NotificationsIcon from "@mui/icons-material/Notifications";
import "./ProfileNavBar.css";

const ProfileNavBar = () => {
  const navigate = useNavigate();
  return (
    <section className="profile-app-bar">
      <Box>
        <AppBar
          position="sticky"
          style={{
            backgroundColor: "#FFFFFF",
            boxShadow: 0,
          }}
          className="app-bar"
        >
          <Toolbar>
            <Box sx={{ flexGrow: 1 }} />
            <Tooltip title="News">
              <IconButton size="larger" onClick={() => navigate("/feed")}>
                <NewspaperIcon style={{ color: "grey" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Notifications">
              <IconButton size="large">
                <NotificationsIcon style={{ color: "grey" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Profile">
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <Avatar
                  src="../../../../public/PetInfo/pet-info-dog.jpg"
                  sx={{
                    width: 40,
                    height: 40,
                  }}
                />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
      </Box>
    </section>
  );
};

export default ProfileNavBar;
