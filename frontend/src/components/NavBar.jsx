import { Box, Button, Container, Typography } from "@mui/material"
import { Link, useNavigate } from "react-router"

const NavBar = () => {
    const navigate = useNavigate();
    return (
        <Box sx={{ backgroundColor: '#2578FC', color: 'white', p: '1rem' }}>
            <Container sx={{ display: 'flex', gap: '5rem', justifyContent: 'flex-start', alignItems: 'center' }}>
                <div>
                    <Button sx={{ textTransform: 'none', color: 'white' }} onClick={() => {
                        navigate('/')
                    }}>
                        <Typography variant="h4">Cl9ud</Typography>
                    </Button>
                </div>
                <div>
                    <Typography variant="h6">Core Functions</Typography>
                </div>
                <div>
                    <Typography variant="h6">Features</Typography>
                </div>
                <div>
                    <Typography variant="h6">Pricing</Typography>
                </div>
                <Button sx={{ textTransform: 'none', color: 'white', ml: 'auto' }} onClick={() => {
                    navigate('/login')
                }}>
                    <Typography variant="h5" >Log In / Sign Up</Typography>
                </Button>
            </Container>
        </Box >
    )
}

export default NavBar
