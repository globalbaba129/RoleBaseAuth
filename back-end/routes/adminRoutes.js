import express from "express";
import { Delete, getUser } from "../controllers/AdminAuth.js";
import { isAdmin } from "../midelware/verifyToken.js";

const AdminRoute = express.Router();

AdminRoute.get('/getuser', isAdmin, getUser);
AdminRoute.post('/delete/:id', isAdmin, Delete);

export default AdminRoute;
