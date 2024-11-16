const productModel = require("../models/product.model.js");
const supplierModel = require("../models/supplier.model.js");

exports.createProduct = async (req, res) => {
  try {
    const {
      product_id,
      name,
      description,
      price,
      category,
      stock_quantity,
      supplier_id,
    } = req.body;

    const supplier = await supplierModel.findOne({ supplier_id });
    if (!supplier) {
      return res.status(404).json({
        message: "Supplier not found",
      });
    }

    const imagePath = "http://localhost:8080/uploads/" + req.file.originalname;

    const newProduct = await productModel.create({
      product_id,
      name,
      description,
      price,
      category,
      stock_quantity,
      supplier_id: supplier._id,
      image_url: imagePath,
    });

    res.status(201).json({
      message: "Product created successfully",
      newProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating product",
      error: error.message,
    });
  }
};
