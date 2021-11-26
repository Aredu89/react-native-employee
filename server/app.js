const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('./model/index');
const router = require('./router/index');

app.use(bodyParser.json());

const mongoUrl = 'mongodb+srv://employee-app:W3XASboYVpEkNJUW@cluster0.j6leq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to mongo DB')
});
mongoose.connection.on('error', (err) => {
  console.log('Error to connect mongo DB: ', err)
});

app.use('/', router);

app.listen(3003, () => {
  console.log("server runing")
});