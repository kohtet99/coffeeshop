const { now } = require("mongoose");
const productModel = require("../models/product.model.js");
const supplierModel = require("../models/supplier.model.js");

exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      stock_quantity,
      discount,
      reorderlevel,
      origin,
      suppliers,
      ingredients,
    } = req.body;

    const image_url = `https://coffeeshop-19v6.onrender.com/uploads/${req.file.filename}`;

    const supplierName = suppliers.split(",");
    console.log(supplierName);

    // const supplier = await supplierModel.findOne({
    //   name: supplierName,
    // });
    // if (!supplier) {
    //   return res.status(404).json({
    //     message: "Supplier not found",
    //   });
    // }

    const newProduct = await productModel.create({
      name,
      description,
      price,
      discount,
      reorderlevel,
      origin,
      ingredients,
      category,
      stock_quantity,
      supplier_id: supplierName,
      image_url,
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

exports.getAllProducts = async (req, res) => {
  const products = await productModel.find();
  const productCount = await productModel.countDocuments();

  res.status(200).json({
    success: true,
    count: productCount,
    products,
  });
};

exports.getOneProducts= async(req,res)=>{
  const productId =req.params.id;
  const product = await productModel.findById(productId);
  
  res.status(200).json({
    product
  })
}

exports.getProducts = async (req, res) => {
  const currentPage = req.query.page;
  const pageSize = req.query.pageSize;

  const products = await productModel
    .find()
    .skip(pageSize * (currentPage - 1))
    .limit(pageSize);

  res.status(200).json({
    products,
  });
};

exports.updateProduct = async (req, res) => {
  const id = req.params.id;
  const {
    name,
    description,
    price,
    category,
    stock_quantity,
    discount,
    reorderlevel,
    origin,
    suppliers,
    ingredients,
    url,
  } = req.body;

  let image_url = "";

  if (req.file) {
    image_url = `https://coffeeshop-19v6.onrender.com/uploads/${req.file.filename}`;
  } else {
    console.log(url);
    image_url = url;
  }
  let supplierName = [];
  if (suppliers) {
    supplierName = suppliers.split(",");
    console.log(supplierName);
  } else {
    // Handle the case where suppliers is undefined or null
    console.error("Suppliers is undefined or null");
  }

  console.log(suppliers, url, name);

  const newProduct = await productModel.findByIdAndUpdate(id, {
    name,
    description,
    price,
    category,
    stock_quantity,
    discount,
    reorderlevel,
    origin,
    suppliers: supplierName,
    ingredients,
    image_url,
  });

  res.status(200).json({
    message: "Product is successfully updated",
    newProduct,
  });
};

exports.deleteProduct = async (req, res) => {
  const id = req.params.id;

  const deleteProduct = await productModel.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    deleteProduct,
  });
};

exports.updatedOuantity = async (req, res) => {
  try {
    const id = req.params.id;
    const { stock_quantity } = req.body;
    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      {
        stock_quantity,
      },
      { new: true }
    );
    // const updatedProduct = await productModel.updateOne(
    //   { _id: mongoose.Types.ObjectId(id) },
    //   { $set: { stock_quantity: stock_quantity, updatedAt: new Date() } } // Update stock_quantity and updatedAt
    // );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product updated", updatedProduct });
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
};
