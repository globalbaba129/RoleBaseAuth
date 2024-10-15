import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`mongodb+srv://Role:clustor1254Role@cluster0.iovio.mongodb.net/RolebaseDBA?retryWrites=true&w=majority&appName=Cluster0`);

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
