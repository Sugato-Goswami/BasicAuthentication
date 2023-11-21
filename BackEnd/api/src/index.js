const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors')
const app = express();
const mongoose = require("mongoose");
const dbconfig = require("./config/db.config");
const userRoutes = require('./routes/user.routes');
app.use(cors());
app.use(bodyParser.json());
app.use('/api/users', userRoutes);
app.get('/', function (req, res) {
  res.send('Hello World!');
});
mongoose.connect('mongodb://127.0.0.1:27017/crud');
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});
 