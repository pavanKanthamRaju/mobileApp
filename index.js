const express = require("express");
const mongoose = require("mongoose");
const User = require('./models/User');
require("./models/Tracks");
const bcrypt = require("bcrypt");
// const authRoutes = require("./routes/authRoutes");
// const trackRoutes = require("./routes/trackRoutes");
const bodyParser = require("body-parser");
const app = express();
// const requireAuth = require("./middleware/requireAuth");

app.use(bodyParser.json());
// app.use(authRoutes);
// app.use(trackRoutes);

app.use(express.urlencoded({ extended: true })); 
//   "mongodb+srv://stejas995:root@cluster0.jc1rw3f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const mongoUri ="mongodb+srv://new_user53:admin123@clustertestapp.1pj41.mongodb.net/?retryWrites=true&w=majority&appName=ClusterTestApp";

// mongoose.connect(mongoUri);
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("connected", () => {
  console.log("connected");
});
mongoose.connection.on("error", (err) => {
  console.log("connection error", err);
});
// app.get("/", requireAuth, (req, res) => {
//   res.send(`you email is ${req.user.email}`);
// });

app.post('/login', async (req,res)=>{
  const {email,password} = req.body;

  try {
    // 2. Check if email exists in the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    // 3. Compare the password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ error: 'Incorrect password' });
    }

    // 4. Successful login - Send success message
    res.status(200).json({ message: 'Login successful', userId: user._id });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
})
app.post('/insert', async (req,res)=>{
  const {email,password} = req.body;
console.log("email...."+email);
console.log("password...."+password);
const hashedPassword = await bcrypt.hash(password, 10); // 10 salt rounds
  try {
    // Create a new instance of the Record model
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    // Save the record to the database
    const result = await newUser.save();

    // Send the response back with the inserted record's ID
    res.status(201).json({ message: "Record inserted", id: result._id });
  } catch (err) {
    // Handle any errors during insertion
    console.log(err);
    res.status(500).json({ error: "Failed to insert record" });
  }
})
app.get("/", (req, res) => {
  res.send("Hello, World!!!!");
});
app.get("/registerUser",(req,res)=>{
  res.send(`
    <html>
      <head>
        <title>Register User</title>
      </head>
      <body>
        <h1>Register New User</h1>
        <form action="/insert" method="POST">
          <label for="email">Email:</label>
          <input type="email" id="email" name="email" required><br><br>
          <label for="password">Password:</label>
          <input type="password" id="password" name="password" required><br><br>
          <button type="submit">Register</button>
        </form>
      </body>
    </html>
  `);
})
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get users', details: err });
  }
});
app.listen(3000, '0.0.0.0',() => {
  console.log("at 3000");
  // console.log("This is Test....");
});
