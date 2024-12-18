const express = require('express');
const { handleGetUsers, handleGetUser, handleRegister, handleLogin } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
const bcrypt = require('bcrypt');
const { validateRegister, validateLogin } = require('../middleware/validationMiddleware');
const googleRoutes = require('../routes/googleRoutes')

router.get('/', handleGetUsers)
// router.get('/profile', handleGetUser)

router.get('/profile', (req, res) => {
    if (req.isAuthenticated) {
        res.json(req.user)
    } else {
        res.redirect('/users/login')
    }
})

router.post('/login', validateLogin, handleLogin)

// Local registration
router.post('/register', validateRegister, handleRegister);

router.use('/google', googleRoutes)

module.exports = router
