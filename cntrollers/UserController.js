const User = require('../models/User')
const bcrypt = require("bcrypt");

const validate = async (req,res,next)=>{
    const {email,password} = req.body
    try{
   const response = await User.findOne({email})
   if (!response) {
    return res.status(400).json({ error: 'User not found' });
  }

  // 3. Compare the password with the stored hashed password
  const passwordMatch = await bcrypt.compare(password, response.password);

  if (!passwordMatch) {
    return res.status(400).json({ error: 'Incorrect password' });
  }

  // 4. Successful login - Send success message
  res.status(200).json({ message: 'Login successful', userId: response._id });


   }
   catch(error){
    res.json({
        message:"An Error occured"
       })
   } 
}

   const insert = async (req,res,next)=>{
    const {email,password} = req.body;
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
    
}
const test =  (req, res,next) => {
    res.send("Hello, World!!!!");
  };
  const registerUser =(req,res,next)=>{
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
  }
  const getUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ error: 'Failed to get users', details: err });
    }
  };
module.exports = {validate, insert, test, registerUser, getUsers};