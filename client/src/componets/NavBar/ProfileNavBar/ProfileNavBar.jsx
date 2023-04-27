import { useNavigate } from "react-router-dom";
import { useContext } from "react";
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
import LogoutIcon from "@mui/icons-material/Logout";
import "./ProfileNavBar.css";
import { UserContext } from "../../../Pages/Dashboard";

const ProfileNavBar = () => {
  const { parent, vet } = useContext(UserContext);
  const navigate = useNavigate();
  const user = localStorage.getItem("userType");
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
                  src={
                    user === "petParent"
                      ? parent.profilePicture
                      : vet.vetProfile
                  }
                  sx={{
                    width: 40,
                    height: 40,
                  }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Log Out">
              <IconButton
                size="large"
                onClick={() => {
                  localStorage.clear();
                  navigate("/");
                }}
              >
                <LogoutIcon style={{ color: "grey" }} />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
      </Box>
    </section>
  );
};

export default ProfileNavBar;
