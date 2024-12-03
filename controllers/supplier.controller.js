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

  res.status(200).json({
    success: true,
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
