import GoogleIcon from "@mui/icons-material/Google";
import {
  Button,
  FormControl,
  Grid2 as Grid,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import NavBar from "../components/NavBar";
import { useAuth } from "../hooks/AuthContext";

const Register = () => {
  const startGoogleLogin = () => {
    const redirectUri = encodeURIComponent(
      window.location.origin + "/auth-success",
    );
    window.location.href = `http://localhost:3000/users/google?redirect_uri=${redirectUri}`;
  };
  const navigate = useNavigate();
  const { token, setToken } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async () => {
    setErrorMessage("");
    console.log({ email, password, firstName, password });

    try {
      let response = await axios.post("http://localhost:3000/users/register", {
        firstName,
        lastName,
        email,
        password,
      });
      console.log(response);
      setToken(response.data);
      navigate("/");
    } catch (err) {
      console.log(err);
      setErrorMessage(err.response?.data?.errors[0].msg);
    }
  };

  return (
    <div>
      <NavBar />
      <Container>
        <Box
          sx={{
            display: "flex",
            mt: "5rem",
            gap: "2rem",
            flexDirection: "column",
          }}
        >
          <Typography variant="h3">Create Account</Typography>
          <Typography variant="body2" sx={{ maxWidth: "25rem" }}>
            Enter your personal details and get started with us!
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              maxWidth: "50%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <TextField
                id="firstName"
                label="First Name"
                variant="outlined"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
              <TextField
                id="lastName"
                label="Last Name"
                variant="outlined"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            </Box>
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <TextField
              id="password"
              label="Password"
              variant="outlined"
              type={"password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <Typography color="error" variant="subtitle1">
              {errorMessage}
            </Typography>

            <Button variant="contained" onClick={handleRegister}>
              Register
            </Button>
            <Button
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={startGoogleLogin}
            >
              Sign In With Google
            </Button>
            <Button variant="text" onClick={() => navigate("/login")}>
              Already have an account? Log In
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Register;
