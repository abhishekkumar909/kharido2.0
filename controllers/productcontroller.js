import Product from "../models/productmodel.js";


const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      brand,
      price,
      discount,
      stock,
      sku,
      images,
      status,
    } = req.body;


    if (!name || !description || !category || !brand || !price || !stock || !sku) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }


    const existingProduct = await Product.findOne({ sku });

    if (existingProduct) {
      return res.status(409).json({
        success: false,
        message: "sku fill",
      });
    }

    // Create product
    const product = await Product.create({
      name,
      description,
      category,
      brand,
      price,
      discount,
      stock,
      sku,
      images,
      status,
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create product",
      error: error.message,
    });
  }
};




// get all product 

const getProduct = async (req, res) => {
  try {
    const { search, category } = req.query;

    const filter = {};

    if (category) {
      filter.category = {
        $regex: category,
        $options: "i",
      };
    }

    if (search) {
      filter.name = {
        $regex: search,
        $options: "i",
      };
    }



    const producted = await Product.find(filter);

    return res.status(201).json({
      success: true,
      message: "Product data successfully",
      data: producted,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed  product",
      error: error.message,
    });
  }
};


//update product
const updateProduct = async (req, res) => {
  try {


    const upproduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    return res.status(201).json({
      success: true,
      message: "Product updated successfully",
      data: upproduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed   update",
      error: error.message,
    });
  }
};


//delete product

const deleteProduct = async (req, res) => {
  try {


    const removeproduct = await Product.findByIdAndUpdate(
      req.params.id,
    );

    return res.status(201).json({
      success: true,
      message: "Product updated successfully",
      data: removeproduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed   update",
      error: error.message,
    });
  }
};

export { createProduct, getProduct, updateProduct, deleteProduct };
