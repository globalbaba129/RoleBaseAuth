import User from "../models/User.js";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

const JWT_SECRET = "your_jwt_secret_key";

export const Register = async (req, res) => {
    const { username, password, role } = req.body;

    console.log("Received data:", req.body); // Log the received data

    try {
        // Set default role to 'User' if not provided
        const userRole = role || 'User'; // Default to 'User'
        const hash = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hash, role: userRole });
        await newUser.save();

        return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error('Registration error:', error); // Log the error for debugging
        return res.status(400).json({ message: "Error registering user", error: error }); // Log full error object
    }
};


export const Login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // If the user is admin, fetch all users
        let users = [];
        if (user.role === 'Admin') {
            users = await User.find(); // Fetch all users if Admin
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        // Send response with user data and all users if admin
        return res.status(200).json({
            message: "Login successful",
            user: {
                username: user.username,
                role: user.role,
                token
            },
            users
        });
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};


export const Logout = async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ message: "user logged out", });
    } catch (error) {
        return res.status(500).json({ message: "Error logout", error: error.message });
    }
}