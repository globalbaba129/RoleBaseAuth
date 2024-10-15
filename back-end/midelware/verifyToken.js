import User from "../models/User.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = "your_jwt_secret_key";

export const isAdmin = async (req, res, next) => {
    try {
        console.log("Checking for token...");
        const checkToken = req.cookies.token;
        console.log("Token found:", checkToken);

        if (!checkToken) {
            return res.status(401).json({ message: "Invalid token" });
        }

        const decode = jwt.verify(checkToken, JWT_SECRET);
        console.log("Decoded token:", decode); // Log decoded token for debugging

        const user = await User.findById(decode.id); // Use decode.id instead of _id
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        if (user.role !== "Admin") {
            return res.status(403).json({ message: "You are not Admin" });
        }

        req.user = user; // Store the user information in the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        return res.status(403).json({ message: "Invalid token" });
    }
};
