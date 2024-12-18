const express = require('express')
const router = express.Router()

const userRoutes = require('../routes/userRoutes.js')

// Route to render an HTML page
router.get('/', (req, res) => {
    res.render('index', { title: 'Hello World', message: 'Welcome to Cloud 9' });
});

router.use('/users', userRoutes)

module.exports = router
