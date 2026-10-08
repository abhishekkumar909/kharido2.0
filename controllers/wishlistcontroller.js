import Wishlist from "../models/wishlistmodel.js";

// Add product to wishlist
export const addToWishlist = async (req, res) => {
  try {
    const productId = req.params.productId;
    const userId = req.user?.id;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    const alreadyExists = await Wishlist.findOne({
      user: userId,
      product: productId,
    });

    if (alreadyExists) {
      return res.status(400).json({
        success: false,
        message: "Product already exists in wishlist",
      });
    }

    const newWishlist = await Wishlist.create({
      user: userId,
      product: productId,
    });

    return res.status(201).json({
      success: true,
      message: "Product added to wishlist",
      data: newWishlist,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// Get user wishlist
export const getWishlist = async (req, res) => {
  try {
    const userId = req.user?.id;

    const wishlist = await Wishlist.find({ user: userId })
      .populate("product")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: wishlist,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

// Remove product from wishlist
export const removeFromWishlist = async (req, res) => {
  try {
    const productId = req.params.productId;
    const userId = req.user?.id;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    const deletedWishlist = await Wishlist.findOneAndDelete({
      user: userId,
      product: productId,
    });

    if (!deletedWishlist) {
      return res.status(404).json({
        success: false,
        message: "Product not found in wishlist",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product removed from wishlist",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};


export default {getWishlist,addToWishlist,removeFromWishlist};