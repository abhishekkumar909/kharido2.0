import express from "express";
import { register, login,logout, profile, findprofile, updateprofile } from "../controllers/usercontroller.js";
import { verifytoken } from "../middelware/authmiddelware.js";


const router = express.Router();
// login mathod
router.post("/register", register);
router.post("/login", login);

router.post("/logout", verifytoken, logout);


// profile apis
router.get("/profile", verifytoken, profile);
router.get("/profile/:id", verifytoken, findprofile);
router.put("/profile/:id", verifytoken, updateprofile);

export default router;