import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from "dotenv"
import sequelize from './config/database.js';
import authRouter from "./routes/auth-route.js"
import postRouter from "./routes/post-route.js"


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));
dotenv.config();

app.get("/", (req, res) => {
    res.send("Hello World!");
})
app.use("/user", authRouter);
app.use("/post", postRouter);

const PORT = 8000;


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