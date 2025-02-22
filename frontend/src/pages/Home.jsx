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
import NavBar from "../components/NavBar";
import { useAuth } from "../hooks/AuthContext";
import CheckIcon from "@mui/icons-material/Check";
import StarIcon from "@mui/icons-material/Star";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Item = ({ title, description }) => {
  return (
    <Paper
      sx={{
        height: "10rem",
        p: "2rem",
        textAlign: "left",
        ":hover": {
          boxShadow: 20,
          scale: 1.05,
        },
      }}
    >
      <Typography gutterBottom variant="h3">
        {title}
      </Typography>
      <Typography>{description}</Typography>
    </Paper>
  );
};

const Home = () => {
  const { user, setUser, token } = useAuth();
  const navigate = useNavigate();

  const fetchUser = async () => {
    if (!token) return;

    let response = await axios.get("http://server.cloud9app.site/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    setUser(response.data);
  };

  useEffect(() => {
    fetchUser();
  }, [token]);

  return (
    <div>
      <NavBar />
      <Container>
        <Box sx={{ display: "flex", mt: "5rem", gap: "2rem" }}>
          <Box>
            <Typography
              gutterBottom
              color="primary"
              variant="h1"
              sx={{ fontWeight: "900", letterSpacing: "0.25rem" }}
            >
              Cl9ud
            </Typography>
            <Typography gutterBottom variant="body2">
              Our application is designed to provide seamless, client-side
              encryption and decryption for files stored in the cloud. With a
              focus on privacy, the app ensures that sensitive files remain
              unreadable to anyone without the correct encryption key by
              encrypting files before they’re uploaded and decrypting them upon
              download.
            </Typography>
            <Button
              variant="contained"
              sx={{ mt: "2rem" }}
              onClick={() => {
                if (token) {
                  navigate("/downloads");
                } else {
                  navigate("/login");
                }
              }}
            >
              Get it Now
            </Button>
          </Box>
          <Box>
            <img src={require("../images/lock-icon.png")} alt="" />
          </Box>
        </Box>
      </Container>
      <Box id="features" sx={{ backgroundColor: "#85B5FF", py: "2rem" }}>
        <Container>
          <Grid
            container
            rowSpacing={4}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{
              justifyContent: "center",
              justifyItems: "center",
              textAlign: "center",
            }}
          >
            <Grid size={12}>
              <Typography
                color={"white"}
                variant="h4"
                sx={{
                  fontWeight: "900",
                  textTransform: "uppercase",
                  letterSpacing: "0.25rem",
                }}
              >
                Many problems <span style={{ color: "#2578FC" }}>one</span>{" "}
                solution
              </Typography>
            </Grid>
            <Grid size={4}>
              <Item
                title={"encryption"}
                description={
                  "We ensure your files cannot be tampered with, due to our high level of security"
                }
              ></Item>
            </Grid>
            <Grid size={4}>
              <Item
                title={"key management"}
                description={
                  "We help with creating, maintaining, protecting, and controlling the use of cryptographic keys"
                }
              ></Item>
            </Grid>
            <Grid size={4}>
              <Item
                title={"cloud"}
                description={
                  "Effortlessly encrypts files before upload and decrypts on download, ensuring secure and private cloud storage."
                }
              ></Item>
            </Grid>
            <Grid size={4}>
              <Item
                title={"decryption"}
                description={
                  "We provide performant and reliable decryption functionality, prioritising ease of use without sacrificing security or performance."
                }
              ></Item>
            </Grid>
            <Grid size={4}>
              <Item
                title={"storage"}
                description={
                  "Users can store, access, and maintain data online"
                }
              ></Item>
            </Grid>
            <Grid size={4}>
              <Item
                title={"sharing"}
                description={
                  "We allow multiple users, applications, to access the same data resources. It improves efficiency, increase transparency, and foster collaboration."
                }
              ></Item>
            </Grid>
          </Grid>
        </Container>
      </Box>

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
            width: "16rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography gutterBottom variant="h5">
            Free
          </Typography>
          <Typography gutterBottom variant="h2" sx={{ fontWeight: "900" }}>
            $0
            <span style={{ fontWeight: "bold", fontSize: "2rem" }}>/mo</span>
          </Typography>
          <Box sx={{ mb: "2rem" }}>
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <CheckIcon />
              <Typography>128-bit encryption</Typography>
            </Box>
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <CheckIcon />
              <Typography>Link to cloud storage services</Typography>
            </Box>
          </Box>
          <Button
            variant="outlined"
            sx={{ mt: "auto" }}
            onClick={() => {
              navigate("/register");
            }}
          >
            Sign Up
          </Button>
        </Card>
        <Card
          elevation={3}
          sx={{
            p: "3rem",
            backgroundColor: "#2578FC",
            color: "white",
            width: "16rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: "1rem",
              gap: "1rem",
            }}
          >
            <Typography variant="h5">Premium</Typography>
            <StarIcon sx={{ color: "gold" }} />
          </Box>
          <Typography gutterBottom variant="h2" sx={{ fontWeight: "900" }}>
            $4.9
            <span style={{ fontWeight: "bold", fontSize: "2rem" }}>/mo</span>
          </Typography>
          <Box sx={{ mb: "2rem" }}>
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <CheckIcon />
              <Typography>128-bit / 256-bit encryption</Typography>
            </Box>
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <CheckIcon />
              <Typography>Unlimited uploads / downloads</Typography>
            </Box>
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <CheckIcon />
              <Typography>Link to cloud storage services</Typography>
            </Box>
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <CheckIcon />
              <Typography>Bulk encryption and uploads</Typography>
            </Box>
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <CheckIcon />
              <Typography>Advanced key management</Typography>
            </Box>
          </Box>
          <Button
            variant="outlined"
            sx={{ mt: "auto", color: "white", borderColor: "white" }}
            onClick={() => {
              navigate("/register");
            }}
          >
            Sign Up
          </Button>
        </Card>
      </Box>
    </div>
  );
};

export default Home;
