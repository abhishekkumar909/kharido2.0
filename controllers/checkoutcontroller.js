import Checkout from "../models/checkoutmodel.js";

// Create Checkout
export const createCheckout = async (req, res) => {
  try {
   const userId = req.user.id;

    const {
      addressId,
      checkStock,
      subtotal,
      discount,
      shippingCharge,
      tax,
       totalAmount,
      couponCode,
      paymentMethod,
    } = req.body;

    if (!addressId ||!subtotal || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: "Fill all the required fields",
      });
    }

 


    const checkout = await Checkout.create({
      user: userId,
      addressId,
      checkStock,
      subtotal,
      discount,
      shippingCharge,
      tax,
      totalAmount,
      couponCode,
      paymentMethod,
    });

    return res.status(201).json({
      success: true,
      message: "Checkout created successfully",
      data: checkout,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export default createCheckout;
