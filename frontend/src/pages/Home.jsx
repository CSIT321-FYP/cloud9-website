import { Box, Container, List, ListItem, Typography } from "@mui/material"

const Home = () => {
    return (
        <div>
            <Box sx={{ backgroundColor: '#2578FC' }}>
                <Container>
                    <List sx={{ display: 'flex', color: 'white', textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}>
                        <ListItem>
                            <Typography variant="h3">Cl9ud</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography variant="h6">About</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography variant="h6">Core Functions</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography variant="h6">Features</Typography>
                        </ListItem>
                        <ListItem>
                            <Typography variant="h6">Pricing</Typography>
                        </ListItem>
                    </List>
                </Container>
            </Box>
            <Container>
            </Container>
        </div>
    )
}

export default Home
