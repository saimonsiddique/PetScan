import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./Success.css";
import ProfileNavBar from "../NavBar/ProfileNavBar/ProfileNavBar";
import AnnonymousBar from "../NavBar/AnnonymousBar/AnnonymousBar";
const Success = () => {
  return (
    <div className="success-container">
      <div className="success-nav-bar">
        <AnnonymousBar />
      </div>
      <div className="success-content">
        <div className="check-logo">
          <svg
            width="180px"
            height="180px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M16.5 5.38468C18.6128 6.82466 20 9.25033 20 12C20 16.4183 16.4183 20 12 20C11.5898 20 11.1868 19.9691 10.7932 19.9096M13.1599 4.08348C12.7812 4.02847 12.3939 4 12 4C7.58172 4 4 7.58172 4 12C4 14.708 5.34553 17.1018 7.40451 18.5492M13.1599 4.08348L12.5 3M13.1599 4.08348L12.5 5M10.7932 19.9096L11.7561 19M10.7932 19.9096L11.5 21M9 12L11 14L15 10"
                stroke="#14db22"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </g>
          </svg>
        </div>
        <div className="success-text">
          <h1>Success!</h1>
          <p>
            Your appointment has been scheduled. We will send you a confirmation
            email shortly.
          </p>
        </div>
        <Link
          to="/dashboard"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Button variant="contained" color="success">
            Go to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
