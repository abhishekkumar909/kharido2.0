import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    paymentMethod: {
      type: String,
      default: "ONLINE",
    },

    gatewayOrderId: {
      type: String,
      required: true,
      index: true,
    },

    transactionId: {
      type: String,
      unique: true,
      sparse: true,
    },

    gatewayPaymentId: {
      type: String,
      unique: true,
      sparse: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    paymentStatus: {
      type: String,
      enum: [
        "PENDING",
        "SUCCESS",
        "FAILED",
        "REFUNDED",
      ],
      default: "PENDING",
    },

    paidAt: {
      type: Date,

    },
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
