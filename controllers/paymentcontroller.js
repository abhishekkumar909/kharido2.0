import Payment from "../models/paymentmodel.js";
import crypto from "crypto";
import Razorpay from "razorpay";



const getRazorpay = () =>
  new Razorpay({
    key_id: (process.env.RAZORPAY_KEY_ID).trim(),
    key_secret: (process.env.RAZORPAY_KEY_SECRET).trim(),
  });


const createPayment = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid amount is required",
      });
    }

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return res.status(500).json({
        success: false,
        message: "Razorpay keys are not configured in .env",
      });
    }

    const razorpay = getRazorpay();

   
    const order = await razorpay.orders.create({
       
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: "rcpt_" + Date.now(),
    });

    const payment = await Payment.create({
      gatewayOrderId: order.id,
      amount,
    });

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      keyId: process.env.RAZORPAY_KEY_ID,
      order,
      payment,
    });
  } catch (error) {
    console.error("Create Payment Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create payment",
      error: error.message,
    });
  }
};

// VERIFY PAYMENT
const verifyPayment = async (req, res) => {
  try {
    const { gatewayOrderId, gatewayPaymentId, signature, transactionId } =
      req.body;

    if (!gatewayOrderId || !gatewayPaymentId || !signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification details are required",
      });
    }

    const secret = (process.env.RAZORPAY_KEY_SECRET || "").trim();

    if (!secret) {
      return res.status(500).json({
        success: false,
        message: "Razorpay secret key is not configured in .env",
      });
    }

    const body = gatewayOrderId + "|" + gatewayPaymentId;

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(body)
      .digest("hex");

    if (expectedSignature !== signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }

    const payment = await Payment.findOne({ gatewayOrderId });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    payment.gatewayPaymentId = gatewayPaymentId;
    if (transactionId) {
      payment.transactionId = transactionId;
    }
    payment.paymentStatus = "SUCCESS";
    payment.paidAt = new Date();

    await payment.save();

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      payment,
    });
  } catch (error) {
    console.error("Verify Payment Error:", error);

    return res.status(500).json({
      success: false,
      message: "Payment verification failed",
      error: error.message,
    });
  }
};

export { createPayment, verifyPayment };