import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import apiService from "../../ApiServices/ApiService";
import {
  Stack,
  Button,
  Box,
  Divider,
  TextField,
  InputAdornment,
  IconButton,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import userWithPet from "../../assets/signup/user-with-pet.svg";
import "./SignIn.css";
import AnnonymousBar from "../NavBar/AnnonymousBar/AnnonymousBar";

const initialState = {
  email: "",
  password: "",
};

const SignIn = () => {
  const navigate = useNavigate();
  const [state, setState] = useState(initialState);
  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const LoginUser = async (e) => {
    e.preventDefault();
    // extract the user data from the state
    const { email, password } = state;
    const user = {
      email,
      password,
    };

    // send the user data to the server
    const response = await apiService.signin(user);

    //
    if (response.error) {
      alert(`${res.msg}`);
      setState(initialState);
    } else {
      // save the token and usetype in the local storage
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("userType", response.user);
      localStorage.setItem("userId", response.userId);
      // redirect to the profile page upon successful login

      // navigate("/dashboard");
      navigate("/dashboard");
    }
  };

  return (
    <>
      <section className="signin-container">
        <AnnonymousBar />
        <div className="signin-form">
          <div className="signin-header">
            <img className="logo" src={userWithPet} alt="logo" />
            <h1>Sign In to your account</h1>
            <p>
              <b>Or</b>
            </p>
            <span>
              <Link to={"/register"}>
                <strong>Create a new account</strong>
              </Link>
            </span>
          </div>
          <Divider sx={{ mt: 2 }} />
          <div className="form">
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "30vw" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                required
                name="email"
                label="Email"
                variant="outlined"
                onChange={handleChange}
              />
            </Box>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "30vw" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                required
                name="password"
                label="Password"
                variant="outlined"
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </div>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              m: 1,
            }}
          >
            <Button
              variant="contained"
              style={{ width: "60%" }}
              onClick={LoginUser}
            >
              Sign In
            </Button>
          </Box>
          <div className="forgot-password">
            <Link to={"/register"}>Forgot Password?</Link>
          </div>
          <Divider sx={{ mt: 2 }} />
        </div>
      </section>
    </>
  );
};

export default SignIn;
