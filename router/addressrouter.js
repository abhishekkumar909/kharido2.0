import express from "express";
import {address,getaddress,updateaddress,deleteaddress} from "../controllers/addresscontroller.js";
import { verifytoken } from "../middelware/authmiddelware.js";

const router = express.Router();

router.post("/address", verifytoken, address);
router.get("/address",verifytoken,getaddress);
router.put("/address/:id",verifytoken,updateaddress);
router.delete("/address/:id",verifytoken,deleteaddress);

export default router;