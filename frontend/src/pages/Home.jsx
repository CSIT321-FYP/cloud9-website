import { Box, Button, Container, List, ListItem, Typography } from "@mui/material"
import NavBar from "../components/NavBar"

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
                <Box>
                </Box>
            </Container>
        </div>
    )
}

export default Home
