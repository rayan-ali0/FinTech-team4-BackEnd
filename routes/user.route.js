import express from "express";
import { test, updateUser, deleteUser, updateUserPic } from "../controllers/user.controller.js";
import { verifyRole, verifyToken } from "../utils/verifyToken.js";
import upload from "../utils/multer.js";
// import {verifyUserType} from '../utils/verifyUserType.js'

const router = express.Router();

router.get("/test",test);

router.post("/update/:id",verifyToken,verifyRole(["admin", "user"]),  updateUser);
router.patch("/update/pic/:id", verifyToken, upload.single("profile"),updateUserPic);
router.delete("/delete/:id",verifyToken, deleteUser);

export default router;