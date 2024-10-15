import User from "../models/User.js";

export const getUser = async (req, res, next) => {

    try {
        const users = await User.find();
        res.status(401).json({ users });
    } catch (error) {
        res.status(400).json({ massage: "internal server  error" });
        console.log(error)
    }
}

export const Delete = async (req, res, next) => {
    try {
        const user_id = req.params.id;
        const user = await User.findByIdAndDelete(user_id);
        if (!user) {
            res.status(400).json({ massage: "user not found" });
        }
        res.status(200).json({ massage: "user deleted succesfully ", user });
    } catch (error) {
        res.status(400).json({ massage: "internal server  error" });
    }
}