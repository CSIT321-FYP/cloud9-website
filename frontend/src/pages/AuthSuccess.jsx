import { CircularProgress, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import NavBar from "../components/NavBar";
import { useAuth } from "../hooks/AuthContext";

const AuthSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setToken } = useAuth();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get("status");
    console.log(queryParams.get("user"));
    setToken(
      status === "success" ? decodeURIComponent(queryParams.get("user")) : null,
    );
    navigate("/");
  }, [location, setToken, navigate]);

  return (
    <div>
      <NavBar />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "5rem",
          my: "5rem",
          justifyContent: "center",
          textAlign: "center",
          justifyItems: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
        <Typography variant="subtitle1">Authenticating</Typography>
      </Container>
    </div>
  );
};

export default AuthSuccess;
