import express from "express";
import { test, updateUser, deleteUser, updateUserPic,getUser , getUsers} from "../Controllers/user.controller.js";
import { verifyRole, verifyToken } from "../utils/verifyToken.js";
import upload from "../utils/multer.js";
// import {verifyUserType} from '../utils/verifyUserType.js'

const router = express.Router();

router.get("/test",test);

// router.put("/update/:id",verifyToken,verifyRole(["admin", "user"]),  updateUser);
router.put("/update/:id", updateUser);

// router.patch("/update/pic/:id", verifyToken, upload.single("profile"),updateUserPic);
router.patch("/update/pic/:id", upload.single("profile"),updateUserPic);
// router.delete("/delete/:id",verifyToken, deleteUser);
router.delete("/delete/:id", deleteUser);

router.get("/read/:id", getUser);
router.get("/users", getUsers);


export default router;