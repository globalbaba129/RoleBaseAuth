import AdminRoute from "./routes/adminRoutes.js";
import AuthRoute from "./routes/authRaoutes.js";
import connectDB from "./config/dbConnect.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173', // Adjust this to your frontend port
    credentials: true // Allows cookies to be sent
}));

const PORT = process.env.PORT || 3000;

connectDB();

app.use('/api/auth', AuthRoute);
app.use('/api/Admin', AdminRoute);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
