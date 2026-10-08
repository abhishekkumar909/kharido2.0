import express from "express";

import createCheckout from "../controllers/checkoutcontroller.js";
import { verifytoken } from "../middelware/authmiddelware.js";


const router = express.Router();

router.post("/checkout",verifytoken,createCheckout);

export default router;