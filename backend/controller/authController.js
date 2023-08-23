import User from "../models/User.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const register =  async (req,res) => {
    const { username, email, password } = req.body;

    try {  
          // Check if a user with the same email already exists
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
          return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 10);
  
        // Create a new user
        const newUser = await User.create({
          username,
          email,
          password: hashedPassword,
        });

        const token = jwt.sign({ id: newUser.id, email: newUser.email }, process.env.SECRET, { expiresIn: '1h' });

        res.status(201).json({ message: 'User registered successfully', user: newUser, token });
      } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
      }
}

export const login =  async (req,res) => {
    const { email, password } = req.body;

    try {  
       // Find the user by email
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
          }
    
          // Create a JWT token for the user
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET, { expiresIn: '1h' });
  
        res.status(200).json({ message: 'Login successful', token, user });
      } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
      }
}