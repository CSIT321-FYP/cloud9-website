import NavBar from "../components/NavBar";
import {
  Box,
  Button,
  Card,
  Container,
  List,
  ListItem,
  Paper,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useAuth } from "../hooks/AuthContext";
import CheckIcon from "@mui/icons-material/Check";
import StarIcon from "@mui/icons-material/Star";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Downloads = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <NavBar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          m: "3rem",
        }}
      >
        <Typography variant="h4">Donwloads</Typography>
        <Box
          id="pricing"
          sx={{
            py: "2rem",
            display: "flex",
            justifyContent: "center",
            gap: "3rem",
          }}
        >
          <Card
            elevation={3}
            sx={{
              p: "3rem",
              width: "20rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography gutterBottom variant="h6">
              Download for Windows
            </Typography>
            <Button
              variant="outlined"
              sx={{ mt: "auto" }}
              onClick={() => {
                navigate("/register");
              }}
            >
              Download
            </Button>
          </Card>
          <Card
            elevation={3}
            sx={{
              p: "3rem",
              width: "20rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography gutterBottom variant="h6">
              Download for Linux
            </Typography>
            <Button
              variant="outlined"
              sx={{ mt: "auto" }}
              onClick={() => {
                navigate("/register");
              }}
            >
              Download
            </Button>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default Downloads;
