import './App.css';
import { Route, Routes } from 'react-router';
import Home from './pages/Home';
import AuthLayout from './pages/AuthLayout';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';


const themeOptions = {
    palette: {
        mode: 'light',
        primary: {
            main: '#2578fc',
        },
        secondary: {
            main: '#9c27b0',
        },
        background: {
            default: '#fff',
            paper: '#fff',
        },
    },
    typography: {
        fontFamily: '"Montserrat", "Helvetica", "Arial", sans-serif',
        body2: {
            fontSize: '1.5rem',
        },
    },
};

const theme = createTheme(themeOptions)

function App() {

    return (
        <ThemeProvider theme={theme}>
            <Routes>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />

                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
            </Routes>
        </ThemeProvider>
    );
}

export default App;
