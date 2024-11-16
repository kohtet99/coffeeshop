const supplierModel = require("../models/supplier.model.js");

exports.create = async (req, res) => {
  try {
    const { supplier_id, name, contact_person, phone, email } = req.body;

    const newSupplier = await supplierModel.create({
      supplier_id,
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
