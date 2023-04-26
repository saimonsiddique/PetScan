import React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { Avatar, Card } from "@mui/material";

const ReviewCard = ({ review }) => {
  return (
    <>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          height: "100%",
          width: "25%",
          margin: "0 auto",
          padding: "2%",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          ":hover": {
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            transform: "scale(1.05)",
            transition: "all 0.3s ease-in-out",
          },
        }}
      >
        <Rating value={review.rating} precision={0.5} readOnly />
        <Typography
          variant="h6"
          sx={{
            color: "#374151",
            fontSize: "20px",
            fontWeight: "550",
            textAlign: "center",
            marginTop: "5%",
          }}
        >
          "{review.review}"
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            mt: "15%",
          }}
        >
          <Avatar
            alt={review.name}
            src="/static/images/avatar/1.jpg"
            sx={{
              width: 36,
              height: 36,
              mt: 2,
              bgcolor: "#5453B5",
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "#374151",
                fontSize: "14px",
                fontWeight: "bold",
                ml: 1,
                mt: 1.25,
                mb: 0,
              }}
            >
              {review.name}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "#374151",
                fontSize: "14px",
                ml: 2,
              }}
            >
              {review.reviewDate}
            </Typography>
          </Box>
        </Box>
      </Card>
    </>
  );
};

export default ReviewCard;
