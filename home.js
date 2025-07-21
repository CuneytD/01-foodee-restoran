const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get("/index", function(req, res) {
  res.render('index');
});

app.get("/", function(req, res) {
  res.render('index');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});