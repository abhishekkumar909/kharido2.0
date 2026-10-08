
import { verifytoken } from "../middelware/authmiddelware.js";
import { createProduct,getProduct,updateProduct,deleteProduct} from "../controllers/productcontroller.js";

import expresss from "express";

const router = expresss.Router();

router.post("/product",verifytoken,createProduct);
router.get("/product",verifytoken,getProduct);
router.put("/product/:id",verifytoken,updateProduct);
router.delete("/product/:id",verifytoken,deleteProduct);

export default router;