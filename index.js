const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  const filesDir = path.join(__dirname, 'files');
  fs.readdir(filesDir, (err, files) => {
    if (err) {
      console.error('Failed to read files directory:', err);
      files = [];
    }
    res.render('index', { files: files || [] });
  });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));