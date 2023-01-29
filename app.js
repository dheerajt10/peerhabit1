const path= require('path');
const express = require('express');
const bodyParser = require('body-parser');

const userRoutes= require('./routes/user');
const mongoose = require('mongoose');


const app = express(); 

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: true}));

app.use(express.static(path.join(__dirname, 'public'))); 

app.use(userRoutes);

mongoose
  .connect(
    'mongodb+srv://10102005dt:10102005@cluster0.pezeqlp.mongodb.net/User?retryWrites=true')
  .then(result => {
    app.listen(3001);
  })
  .catch(err => {
    console.log(err);
  });
