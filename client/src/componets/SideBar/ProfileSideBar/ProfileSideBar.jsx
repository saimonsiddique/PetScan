import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../Pages/Dashboard";
import { Link } from "react-router-dom";
import { List, ListItemButton, ListItemText } from "@mui/material";
import LayersIcon from "@mui/icons-material/Layers";
import PetsIcon from "@mui/icons-material/Pets";
import GroupsIcon from "@mui/icons-material/Groups";
import SettingsApplicationsSharpIcon from "@mui/icons-material/SettingsApplicationsSharp";
import AddLocationSharpIcon from "@mui/icons-material/AddLocationSharp";
import "./ProfileSideBar.css";

const ProfileSideBar = () => {
  const user = localStorage.getItem("userType");
  const navigate = useNavigate();

  const { questionQuery, setQuestionQuery } = useContext(UserContext);

  const handleClick = () => {
    setQuestionQuery(!questionQuery);
  };

  return (
    <section className="side-bar">
      <img
        src={`https://res.cloudinary.com/dru7kzv3i/image/upload/v1687851076/parent-nav_yy60bb.jpg`}
        alt=""
        className="side-logo"
      />
      <nav className="sidebar-content">
        <List>
          <ListItemButton
            sx={{
              borderRadius: "10px",
            }}
            onClick={() => setQuestionQuery(!questionQuery)}
          >
            <LayersIcon />
            <ListItemText
              sx={{
                paddingLeft: "4%",
              }}
              primaryTypographyProps={{
                fontSize: "1.2rem",
                fontFamily: "Roboto",
              }}
              primary="Dashboard"
            />
          </ListItemButton>
          {user === "petParent" ? (
            <>
              <ListItemButton
                sx={{
                  borderRadius: "10px",
                }}
                onClick={() => navigate("/pet/add")}
              >
                <PetsIcon />
                <ListItemText
                  sx={{
                    paddingLeft: "4%",
                  }}
                  primaryTypographyProps={{
                    fontSize: "1.2rem",
                    fontFamily: "Roboto",
                  }}
                  primary="Add Pet"
                />
              </ListItemButton>
            </>
          ) : (
            <ListItemButton onClick={handleClick}>
              <GroupsIcon />
              <ListItemText
                sx={{
                  paddingLeft: "4%",
                }}
                primaryTypographyProps={{
                  fontSize: "1.2rem",
                  fontFamily: "Roboto",
                }}
                primary={"Consulted patients"}
              />
            </ListItemButton>
          )}

          {user === "petParent" ? (
            <Link to="/book-appointment">
              <ListItemButton
                sx={{
                  borderRadius: "10px",
                }}
              >
                <AddLocationSharpIcon />
                <ListItemText
                  sx={{
                    paddingLeft: "4%",
                  }}
                  primaryTypographyProps={{
                    fontSize: "1.2rem",
                    fontFamily: "Roboto",
                  }}
                  primary={"Book an Appointment"}
                />
              </ListItemButton>
            </Link>
          ) : (
            <ListItemButton
              sx={{
                borderRadius: "10px",
              }}
              onClick={() => navigate("/form")}
            >
              <AddLocationSharpIcon />
              <ListItemText
                sx={{
                  paddingLeft: "4%",
                }}
                primaryTypographyProps={{
                  fontSize: "1.2rem",
                  fontFamily: "Roboto",
                }}
                primary={"Add Prescription"}
              />
            </ListItemButton>
          )}
          <ListItemButton onClick={handleClick}>
            <SettingsApplicationsSharpIcon />
            <ListItemText
              sx={{
                paddingLeft: "4%",
              }}
              primaryTypographyProps={{
                fontSize: "1.2rem",
                fontFamily: "Roboto",
              }}
              primary={
                user === "petParent" ? "Asked Questions" : "Answered Questions"
              }
            />
          </ListItemButton>
          {user === "petParent" ? (
            <Link to="/book-appointment">
              <ListItemButton
                sx={{
                  borderRadius: "10px",
                }}
              >
                <GroupsIcon />
                <ListItemText
                  sx={{
                    paddingLeft: "4%",
                  }}
                  primaryTypographyProps={{
                    fontSize: "1.2rem",
                    fontFamily: "Roboto",
                  }}
                  primary={"Consulted Vets"}
                />
              </ListItemButton>
            </Link>
          ) : null}
        </List>
      </nav>
    </section>
  );
};

export default ProfileSideBar;
