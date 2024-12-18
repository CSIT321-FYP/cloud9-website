import './App.css';
import { Route, Routes } from 'react-router';
import Home from './pages/Home';
import AuthLayout from './pages/AuthLayout';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
    return (
        <Routes>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />

            <Route element={<AuthLayout />}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
            </Route>
        </Routes>
    );
}

export default App;
