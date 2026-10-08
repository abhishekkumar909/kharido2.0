

import {addToCart,getCart} from "../controllers/cartcontroller.js";
import { verifytoken } from "../middelware/authmiddelware.js";
import express from "express";

const router = express.Router();

router.post("/cart",verifytoken,addToCart);
router.get("/cart",verifytoken,getCart);
export default router;