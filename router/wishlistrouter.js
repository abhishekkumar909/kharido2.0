import express from "express";
import { getWishlist, addToWishlist, removeFromWishlist } from "../controllers/wishlistcontroller.js";
import { verifytoken } from "../middelware/authmiddelware.js";

const router = express.Router();

router.get("/wishlist", verifytoken, getWishlist);
router.post("/wishlist/:productId", verifytoken, addToWishlist);
router.delete("/wishlist/:productId", verifytoken, removeFromWishlist);


export default router;