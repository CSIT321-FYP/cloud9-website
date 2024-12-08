const express = require('express');
const app = express();
const path = require('path');
const routerMiddleware = require('./middleware/routerMiddleware')
const errorMiddleware = require('./middleware/errorMiddleware')

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', routerMiddleware)
app.use('/', errorMiddleware)

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
