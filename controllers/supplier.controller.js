const supplierModel = require("../models/supplier.model.js");
exports.create = async (req, res) => {
  try {
    const { name, contact_person, phone, email } = req.body;
    const newSupplier = await supplierModel.create({
      name,
      contact_person,
      phone,
      email,
    });
    res.status(201).json({
      message: "Supplier created successfully",
      newSupplier,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating supplier",
      error: error.message,
    });
  }
};
exports.getAllSuppliers = async (req, res) => {
  const suppliers = await supplierModel.find();
  const count = await supplierModel.countDocuments();
  res.status(200).json({
    success: true,
    count,
    suppliers,
  });
};
exports.getSupplier = async (req, res) => {
  const id = req.params.id;
  const supplier = await supplierModel.findById(id);
  res.status(200).json({
    success: true,
    supplier,
  });
};
exports.getPaginatedSuppliers = async (req, res) => {
  const currentPage = req.query.page;
  const pageSize = req.query.pageSize;
  const suppliers = await supplierModel
    .find()
    .skip(pageSize * (currentPage - 1))
    .limit(pageSize);
  res.status(200).json({
    success: true,
    suppliers,
  });
};
exports.updatedSupplier = async (req, res) => {
  const id = req.params.id;
  const { name, contact_person, phone, email } = req.body;
  const updatedSupplier = await supplierModel.findByIdAndUpdate(id, {
    name,
    contact_person,
    phone,
    email,
  });
  res.status(200).json({
    success: true,
    updatedSupplier,
  });
};
exports.deletedSupplier = async (req, res) => {
  const id = req.params.id;
  const deletedSupplier = await supplierModel.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    deletedSupplier,
  });
};