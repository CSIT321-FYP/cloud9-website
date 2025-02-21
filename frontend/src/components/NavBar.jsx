import { Avatar, Box, Button, Container, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/AuthContext";

const NavBar = () => {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  console.log({ token, user });
  return (
    <Box
      sx={{
        backgroundColor: "#2578FC",
        color: "white",
        p: "1rem",
        width: "100%",
      }}
    >
      <Container
        sx={{
          display: "flex",
          gap: "5rem",
          justifyContent: "flex-start",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div>
          <Button
            sx={{ textTransform: "none", color: "white" }}
            onClick={() => {
              navigate("/");
            }}
          >
            <Typography variant="h4">Cl9ud</Typography>
          </Button>
        </div>
        <a
          href="/#features"
          style={{
            textTransform: "none",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          <Typography variant="h6">Features</Typography>
        </a>
        <a
          href="/#pricing"
          style={{
            textTransform: "none",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          <Typography variant="h6">Pricing</Typography>
        </a>
        {token && user && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ display: "flex", gap: "2rem" }}>
              <a
                href="/downloads"
                style={{
                  textTransform: "none",
                  color: "inherit",
                  ml: "auto",
                  textDecoration: "none",
                }}
              >
                <Typography variant="h6">Downloads</Typography>
              </a>
            </Box>
            <Box
              sx={{
                textTransform: "none",
                color: "white",
                ml: "15rem",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <Avatar />
              <Typography variant="h5">
                {user.firstName} {user.lastName}
              </Typography>
            </Box>
          </Box>
        )}
        {!token && (
          <Box sx={{ ml: "15rem", display: "flex", gap: "2rem" }}>
            <a
              href="/login"
              style={{
                textTransform: "none",
                color: "inherit",
                ml: "auto",
                textDecoration: "none",
              }}
            >
              <Typography variant="h5">Log In</Typography>
            </a>
            <a
              href="/#pricing"
              style={{
                textTransform: "none",
                color: "inherit",
                ml: "auto",
                textDecoration: "none",
              }}
            >
              <Typography variant="h5">Sign Up</Typography>
            </a>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default NavBar;
