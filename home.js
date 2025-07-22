const express = require('express');
const app = express();

const db = require('./data/db');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get("/index", function(req, res) {
  res.render('index');
});

app.get("/", function(req, res) {
  db.execute('SELECT * FROM products')
      .then(result => {
          console.log(result);

          res.render('index');
        });
      })
      // .catch(err => consele.log(err));
  

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});