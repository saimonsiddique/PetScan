import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import AnnonymousBar from "../componets/NavBar/AnnonymousBar/AnnonymousBar";

const Home = () => {
  let navigate = useNavigate();
  const [petParent, setPetParent] = useState(false);
  const [vet, setVet] = useState(false);

  // set user type on click
  const handleClick = (e) => {
    const { value } = e.target;
    if (value === "petParent") {
      setPetParent(true);
    } else {
      setVet(true);
    }
  };

  // redirect to the correct page
  useEffect(() => {
    if (petParent) {
      navigate("/signup/petParent");
    } else if (vet) {
      navigate("/signup/vet");
    }
  }, [petParent, vet]);

  return (
    <section className="homepage-container">
      <AnnonymousBar />
      <div className="page-content">
        <img
          src={
            "https://res.cloudinary.com/dru7kzv3i/image/upload/v1687851075/logo_lzbmqj.png"
          }
          className="title-logo"
        />
        <h2>
          <p align={"justify"} className="title">
            Petscan is a professional pet healthcare platform that connects pet
            parents to licensed veterinarians. With Petscan, pets receive
            personalized and reliable care, available anytime, anywhere.
          </p>
        </h2>
        <h3>Create an account to get started</h3>
        <Box sx={{ "& button": { m: 2 } }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClick}
            value={"petParent"}
          >
            I'm a Pet Parent
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClick}
            value={"veterinarian"}
          >
            I'm a Veterinarian
          </Button>
        </Box>
        <span className="home-foot">
          <Link to={"/signin"}>Sign in into existing account</Link>
        </span>
      </div>
    </section>
  );
};

export default Home;
