import { Box, Button, Container, List, ListItem, Paper, Typography } from "@mui/material"
import Grid from '@mui/material/Grid2';
import NavBar from "../components/NavBar"
import { useAuth } from "../hooks/AuthContext";

const Item = ({ title, description }) => {
    return (
        <Paper sx={{
            height: '10rem', p: '2rem', textAlign: 'left', ':hover': {
                boxShadow: 20,
                scale: 1.05,
            },
        }}>
            <Typography gutterBottom variant="h3">{title}</Typography>
            <Typography>{description}</Typography>
        </Paper>
    )
}

const Home = () => {

    return (
        <div>
            <NavBar />
            <Container>
                <Box sx={{ display: 'flex', mt: '5rem', gap: '2rem' }}>
                    <Box>
                        <Typography gutterBottom color="primary" variant="h1" sx={{ fontWeight: '900', letterSpacing: '0.25rem' }}>Cl9ud</Typography>
                        <Typography gutterBottom variant="body2">Our application is designed to provide seamless, client-side encryption and decryption for files stored in the cloud. With a focus on privacy, the app ensures that sensitive files remain unreadable to anyone without the correct encryption key by encrypting files before they’re uploaded and decrypting them upon download.</Typography>
                        <Button variant="contained" sx={{ mt: '2rem' }}>Get it Now</Button>
                    </Box>
                    <Box>
                        <img src={require('../images/lock-icon.png')} alt="" />
                    </Box>
                </Box>
            </Container>
            <Box sx={{ backgroundColor: '#85B5FF', py: '2rem' }}>
                <Container>
                    <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ justifyContent: 'center', justifyItems: 'center', textAlign: 'center' }}>
                        <Grid size={12}>
                            <Typography color={"white"} variant="h4" sx={{ fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.25rem' }}>
                                Many problems <span style={{ color: '#2578FC' }}>one</span> solution
                            </Typography>
                        </Grid>
                        <Grid size={4}>
                            <Item title={"encryption"} description={"We ensure your files cannot be tampered with, due to our high level of security"}></Item>
                        </Grid>
                        <Grid size={4}>
                            <Item title={"key management"} description={"We help with creating, maintaining, protecting, and controlling the use of cryptographic keys"}></Item>
                        </Grid>
                        <Grid size={4}>
                            <Item title={"cloud"} description={"Effortlessly encrypts files before upload and decrypts on download, ensuring secure and private cloud storage."}></Item>
                        </Grid>
                        <Grid size={4}>
                            <Item title={"decryption"} description={"We provide performant and reliable decryption functionality, prioritising ease of use without sacrificing security or performance."}></Item>
                        </Grid>
                        <Grid size={4}>
                            <Item title={"storage"} description={"Users can store, access, and maintain data online"}></Item>
                        </Grid>
                        <Grid size={4}>
                            <Item title={"sharing"} description={"We allow multiple users, applications, to access the same data resources. It improves efficiency, increase transparency, and foster collaboration."}></Item>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </div>
    )
}

export default Home
