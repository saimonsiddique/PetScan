import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Tooltip,
  Avatar,
  TextField,
} from "@mui/material";

import NewspaperIcon from "@mui/icons-material/Newspaper";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import "./HomeNavBar.css";

const HomeNavBar = () => {
  return (
    <section className="profile-app-bar">
      <Box>
        <AppBar
          position="sticky"
          style={{
            backgroundColor: "#42389D",
            boxShadow: 0,
          }}
          className="app-bar"
        >
          <Toolbar>
            <Box sx={{ flexGrow: 1 }}>
              <TextField
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
                id="outlined-basic"
                label="Search"
                variant="outlined"
                size="small"
                InputProps={{
                  endAdornment: <SearchIcon />,
                }}
              />
            </Box>
            <Tooltip title="News">
              <IconButton size="larger">
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

export default HomeNavBar;
