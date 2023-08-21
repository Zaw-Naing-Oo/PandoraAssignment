import User from "../models/User.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const register =  async (req,res) => {
    const { username, email, password } = req.body;

    try {  
        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 10);
  
        // Create a new user
        const newUser = await User.create({
          username,
          email,
          password: hashedPassword,
        });
  
        res.status(201).json({ message: 'User registered successfully', user: newUser });
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
        const token = jwt.sign({ userId: user.id }, 'your-secret-key', { expiresIn: '1h' });
  
        res.status(200).json({ message: 'Login successful', token, user });
      } catch (error) {
        res.status(500).json({ message: 'An error occurred', error: error.message });
      }
}