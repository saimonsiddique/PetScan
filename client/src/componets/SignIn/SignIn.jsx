import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Stack, Button, Box, Divider, TextField } from "@mui/material";
import { InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import apiClient from "../../ApiClientService/ApiService";
import userWithPet from "../../assets/signup/user-with-pet.svg";
import "./SignIn.css";

const initialState = {
  email: "",
  password: "",
};

const SignIn = () => {
  const [state, setState] = useState(initialState);
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
    const { firstName, lastName, email, password, confirmPassword } = state;
    const newUser = {
      firstName,
      lastName,
      email,
      password,
    };

    // send the user data to the server
    const response = await apiClient.signup(newUser);
    console.log(response);
  };

  const validateForm = () => {
    return state.email.length > 0 && state.password.length > 0;
  };
  return (
    <>
      <div className="signin-form">
        <div className="signin-header">
          <img className="logo" src={userWithPet} alt="logo" />
          <h1>Sign In to your account</h1>
          <span>
            Or <Link to={"/"}>Create a new account</Link>
          </span>
        </div>
        <div className="auth-account">
          <span>Sign In with</span>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Stack direction="row" spacing={3}>
              <Button variant="contained" style={{ width: "25ch" }}>
                Facebook
              </Button>
              <Button variant="contained" style={{ width: "25ch" }}>
                Google
              </Button>
            </Stack>
          </Box>
        </div>
        <Divider />
        <div className="form">
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "52ch" },
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
              "& .MuiTextField-root": { m: 1, width: "52ch" },
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
            style={{ width: "52ch" }}
            onClick={LoginUser}
          >
            Sign In
          </Button>
        </Box>
      </div>
    </>
  );
};

export default SignIn;
