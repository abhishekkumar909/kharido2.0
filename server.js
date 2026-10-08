import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./config/db.js";
import userRouter from "./router/userrouter.js";
import addressrouter from "./router/addressrouter.js";
import productrouter from "./router/productrouter.js";
import wishlistrouter from "./router/wishlistrouter.js";
import checkoutrouter from "./router/checkoutrouter.js";
import paymentrouter from "./router/paymentrouter.js";
import cartrouter from "./router/cartrouter.js";



const app = express();

app.use(express.json());

connectDB();

app.use("/", userRouter);
app.use("/",addressrouter);
app.use("/",productrouter);
app.use("/",wishlistrouter);
app.use("/",checkoutrouter);
app.use("/",paymentrouter);
app.use("/",cartrouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
