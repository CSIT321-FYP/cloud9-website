const express = require('express');
const app = express();
const path = require('path');

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/views/assets', express.static('./views/assets/'))
app.use('/img', express.static('./views/assets/img'))

// Route to render an HTML page
app.get('/', (req, res) => {
  res.render('index', { title: 'Hello World', message: 'Welcome to Cloud 9' });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
