import GoogleIcon from '@mui/icons-material/Google';
import { Button, FormControl, Grid2 as Grid, Input, InputAdornment, InputLabel, TextField, Typography } from "@mui/material"
import { Box, Container } from "@mui/system"
import NavBar from "../components/NavBar"

const Login = () => {
    return (
        <div>
            <NavBar />
            <Container>
                <Box sx={{ display: 'flex', mt: '5rem', gap: '2rem', flexDirection: 'column' }}>
                    <Typography variant="h3">Create Account</Typography>
                    <Typography variant="body2" sx={{ maxWidth: '25rem' }}>Enter your personal details and get started with us!</Typography>
                    <Box sx={{
                        display: 'flex', flexDirection: 'column', gap: '1rem',
                        maxWidth: '50%'
                    }}>
                        <Box sx={{
                            display: 'flex', justifyContent: 'space-between',
                        }}>
                            <TextField id="firstName" label="First Name" variant="outlined" />
                            <TextField id="lastName" label="Last Name" variant="outlined" />
                        </Box>
                        <TextField id="email" label="Email" variant="outlined" />
                        <TextField id="password" label="Password" variant="outlined" />

                        <Button variant="contained">Register</Button>
                        <Button variant="outlined" startIcon={<GoogleIcon />}>
                            Sign In With Google
                        </Button>
                        <Button variant="text" >
                            Already have an account? Log In
                        </Button>

                    </Box>
                </Box>
            </Container>
        </div>
    )
}

export default Login
