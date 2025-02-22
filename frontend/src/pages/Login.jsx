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

const Login = () => {
  const startGoogleLogin = () => {
    const redirectUri = encodeURIComponent(
      window.location.origin + "/auth-success",
    );
    window.location.href = `https://server.cloud9app.site/users/google?redirect_uri=${redirectUri}`;
  };

  const { token, setToken } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignIn = async () => {
    setErrorMessage("");
    console.log({ email, password });

    try {
      let response = await axios.post(
        "https://server.cloud9app.site/users/login",
        {
          email,
          password,
        },
      );
      console.log(response);
      setToken(response.data);
      navigate("/");
    } catch (err) {
      console.log(err);
      setErrorMessage(err.response?.data?.errors[0].msg);
    }
  };

  const navigate = useNavigate();

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
            Enter your credentials to sign in!
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              maxWidth: "50%",
            }}
          >
            <TextField
              id="email"
              required
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="password"
              required
              label="Password"
              variant="outlined"
              type={"password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Typography color="error" variant="subtitle1">
              {errorMessage}
            </Typography>

            <Button variant="contained" onClick={handleSignIn}>
              Sign In
            </Button>
            <Button
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={startGoogleLogin}
            >
              Sign In With Google
            </Button>
            <Button variant="text" onClick={() => navigate("/register")}>
              Don't have an account? Register
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
