import express from "express";
import {createPayment,
    verifyPayment} from "../controllers/paymentcontroller.js";
  import {verifytoken} from "../middelware/authmiddelware.js";

  const router = express.Router();

  router.post("/payment",verifytoken,createPayment);
  router.post("/paymentverify",verifytoken,verifyPayment);

  export default router;