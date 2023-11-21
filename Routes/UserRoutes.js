// User Routes
import express from 'express';
import { test } from '../Controllers/UserController.js';



const router = express.Router();

router.get("/test", test);
// router.post("/update/:id", verifyToken, updateUser);
// router.delete("/delete/:id", verifyToken, deleteUser);

export default router;