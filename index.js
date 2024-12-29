require("./models/User");
require("./models/Tracks");
const express = require("express");
const mongoose = require("mongoose");
// const authRoutes = require("./routes/authRoutes");
// const trackRoutes = require("./routes/trackRoutes");
const bodyParser = require("body-parser");
const app = express();
// const requireAuth = require("./middleware/requireAuth");

app.use(bodyParser.json());
// app.use(authRoutes);
// app.use(trackRoutes);

 
//   "mongodb+srv://stejas995:root@cluster0.jc1rw3f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const mongoUri ="mongodb+srv://new_user53:admin123@clustertestapp.1pj41.mongodb.net/?retryWrites=true&w=majority&appName=ClusterTestApp";

mongoose.connect(mongoUri);
mongoose.connection.on("connected", () => {
  console.log("connected");
});
mongoose.connection.on("error", (err) => {
  console.log("connection error", err);
});
// app.get("/", requireAuth, (req, res) => {
//   res.send(`you email is ${req.user.email}`);
// });

app.listen(3000, () => {
  console.log("at 3000");
  console.log("This is Test....");
});
