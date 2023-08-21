import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from "dotenv"
import sequelize from './config/database.js';


const app = express();

app.use(cors());
app.use(bodyParser.json());
dotenv.config();

const PORT = process.env.PORT || 8000;


// Sync models with the database
sequelize.sync({ force: false }).then(() => {
    console.log('Database synced');
  
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }).catch(error => {
    console.error('Database connection error:', error);
  });