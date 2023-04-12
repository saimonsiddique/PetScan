import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { Stack, Button, Box, Divider, TextField } from "@mui/material";
import { InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import apiClient from "../../../ApiClientService/ApiService";
import userWithPet from "../../../assets/signup/user-with-pet.svg";
import "./SignUp.css";
const PASS_MIN_LENGTH = 8;

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  // let navigate = useNavigate();
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

  const createUser = async (e) => {
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
    try {
      const response = await apiClient.createUser(newUser);
      console.log("response", response);
      // save the token in the local storage
      localStorage.setItem("token", response.data.token);

      // navigate to the login page
      // navigate("/welcome");
    } catch (error) {
      console.log(error);
    }
  };

  const validateForm = () => {
    return (
      state.firstName.length > 0 &&
      state.lastName.length > 0 &&
      state.email.length > 0 &&
      state.password.length > 0 &&
      state.confirmPassword.length > 0
    );
  };

  return (
    <>
      <section className="container">
        <div className="signup-form">
          <div className="header">
            <img className="logo" src={userWithPet} alt="logo" />
            <h1>Create a Pet Parent Account</h1>
            <span>
              Or <Link to={"/signin"}>sign in to an existent account</Link>
            </span>
          </div>
          <div className="auth-account">
            <span>Create account with</span>
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
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                required
                name="firstName"
                label="First Name"
                variant="outlined"
                onChange={handleChange}
              />
              <TextField
                required
                name="lastName"
                label="Last Name"
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
                name="confirmPassword"
                label="Confirm Password"
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
              onClick={createUser}
            >
              Create Account
            </Button>
          </Box>
        </div>
      </section>
    </>
  );
};

export default SignUp;
