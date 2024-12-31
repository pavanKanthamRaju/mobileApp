const express = require("express");
const mongoose = require("mongoose");
const  UserRoute = require('./routers/User')
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true })); 
const mongoUri ="mongodb+srv://new_user53:admin123@clustertestapp.1pj41.mongodb.net/?retryWrites=true&w=majority&appName=ClusterTestApp";
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("connected", () => {
  console.log("connected");
});
mongoose.connection.on("error", (err) => {
  console.log("connection error", err);
});
app.use('/user', UserRoute);
app.listen(3000, '0.0.0.0',() => {
  console.log("at 3000");
});
