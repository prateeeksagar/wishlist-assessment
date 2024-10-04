// src/app.ts
import express, { Application } from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/v1/authRoute';
import mongoose from 'mongoose';
import cookieParser from "cookie-parser";
import cors from 'cors'
// Initialize dotenv to use environment variables
dotenv.config();

mongoose.connect(process.env.MONGO_URL || "")

const app: Application = express();

// Middleware to parse JSON
app.use(cookieParser())
app.use(express.json());
app.use(cors())


//auth routes
app.use('/auth', authRoutes)

app.get('/', (req, res) => {
  res.send('Yeah! server running');
});


dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
