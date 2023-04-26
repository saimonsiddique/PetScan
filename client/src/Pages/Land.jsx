import React from "react";
import HomeNavBar from "../componets/NavBar/HomeNavBar/HomeNavBar";
import { Box, Button, Typography } from "@mui/material";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import ReviewCard from "../componets/ReviewCard/ReviewCard";

const reviewers = [
  {
    name: "Abdul Ahad",
    review: "Very nice and knowledgeable. I would visit here again!",
    rating: 4.5,
    reviewDate: "April 2023",
  },
  {
    name: "Taseen Ashrafi",
    review: "Very beneficial! Anybody should see this website, in my opinion!",
    rating: 5,
    reviewDate: "April 2023",
  },
  {
    name: "Saimon Siddique",
    review:
      "A benefit is the question feed. I would suggest visiting this website!",
    rating: 4.5,
    reviewDate: "April 2023",
  },
];

const Land = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#42389D",
          height: "10%",
        }}
      >
        <HomeNavBar />
      </Box>
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          height: "100%",
          overflow: "hidden",
          overflowY: "scroll",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "left",
            height: "100%",
            backgroundImage: " url(../../public/Homepage/vetster-dog-bed.jpg)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              color: "white",
              fontSize: "50px",
              textAlign: "left",
              marginTop: "12%",
              marginLeft: "5%",
            }}
          >
            Welcome to Petscan
          </Typography>
          <Typography
            variant="h3"
            sx={{
              color: "white",
              fontWeight: "bold",
              fontSize: "40px",
              textAlign: "left",
              marginLeft: "5%",
            }}
          >
            On-demand online vet appointments.
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: "#7DD9BE",
              fontSize: "30px",
              textAlign: "left",
              marginLeft: "5%",
            }}
          >
            Get your pet the care, when they need it.
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#8645B9",
              color: "white",
              fontSize: "14px",
              width: "20%",
              height: "10%",
              marginLeft: "5%",
              marginTop: "4%",
              borderRadius: "10px",
              ":hover": {
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                transform: "scale(1.05)",
                transition: "all 0.3s ease-in-out",
              },
            }}
            startIcon={<VideocamOutlinedIcon />}
          >
            Book an appointment
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "#374151",
              fontSize: "30px",
              textAlign: "center",
              marginTop: "5%",
            }}
          >
            <strong style={{ color: "#5453B5" }}>Book with confidence.</strong>{" "}
            Your pet will <br /> receive care from our licensed online vets.
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "90%",
              padding: "2% 0 2% 0",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                width: "45%",
                height: "100%",
                ml: "3%",
              }}
            >
              <img
                src="/Homepage/vetster-vet-video-appt.svg"
                alt="doctor"
                style={{
                  width: "50%",
                  height: "50%",
                  margin: "0 auto",
                }}
              />

              <Typography
                variant="h3"
                sx={{
                  color: "#374151",
                  fontSize: "20px",
                  fontWeight: "525",
                  textAlign: "center",
                  mt: 2,
                }}
              >
                Convenience for when you have a pet health concern
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#374151",
                  fontSize: "16px",
                  textAlign: "center",
                }}
              >
                If you are unable or if visiting your local clinic is
                challenging for you, we're here for all your pet health
                concerns, big or small.
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                width: "45%",
                height: "100%",
                ml: "3%",
              }}
            >
              <img
                src="/Homepage/user-pet.svg"
                alt="user-with-pet"
                style={{
                  width: "50%",
                  height: "50%",
                  margin: "0 auto",
                }}
              />
              <Typography
                variant="h3"
                sx={{
                  color: "#374151",
                  fontSize: "20px",
                  fontWeight: "525",
                  textAlign: "center",
                  mt: 2,
                }}
              >
                Simple, easy-to-use care solution from the comfort of your home
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#374151",
                  fontSize: "16px",
                  textAlign: "center",
                  marginTop: "1%",
                }}
              >
                Using Petscan will save you time and money while helping to keep
                your pets more comfortable at home.
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontSize: "48px",
              background: "-webkit-linear-gradient(#E14696, #42389D)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            <strong style={{ color: "#5453B5" }}>
              Pet parents love what we do!
            </strong>{" "}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#374151",
              fontSize: "14px",
              textAlign: "center",
              marginTop: "1%",
            }}
          >
            Using PetScan is simple and enjoyable! Here is what some our
            satisfied pet parents have to say…
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "90%",
              padding: "2% 0 2% 0",
              m: "2rem auto",
            }}
          >
            {reviewers.map((review) => {
              return <ReviewCard review={review} />;
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Land;
