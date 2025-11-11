import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import cloudinary from "cloudinary";
import user from "./routes/userroute.js";
import connectedb from "./database/db.js";
import cardget from './routes/cardroute.js'
import path from "path";

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_SECRET,
});



const app = express();
const Port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

// Allow frontend to send cookies
app.use( cors()

);

// Route
app.use("/api/user", user);
app.use('/api/cards',cardget)

// Serve frontend (Vite + React build)
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/frontend/dist')));

// Must be regex in Express v5
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

// Start
app.listen(Port, async () => {
  console.log(`Server is running on ${Port}`);
  await connectedb();
});
