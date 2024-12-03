const customerModel = require("../models/customer.model.js");

exports.registerbyemployee = async (req, res, next) => {
  const { name, email, phone, loyalty_points } =
    req.body;

  const newCustomer = await customerModel.create({
    name,
    email,
    phone,
    loyalty_points,
  });

  res.status(201).json({
    message: "success",
    newCustomer
  });
};

exports.getCustomerInfo = async (req, res, next) => {
  const id = req.params.id;
  const customer = await customerModel.findById(id);
  res.status(200).json({
    success: true,
    customer,
  });
};
exports.getAllCustomers = async (req, res, next) => {
  const customers = await customerModel.find().sort({ createdAt: -1 });
  const count = await customerModel.countDocuments();
  res.status(200).json({
    success: true,
    customers,
    count,
  });
};
exports.searchCustomer = async (req, res, next) => {
  const name = req.query.name;
  const customer = (await customerModel.find()).filter(
    (doc) => doc.name == name
  );
  res.status(200).json({
    success: true,
    customer,
  });
};
exports.getPaginatedCustomers = async (req, res) => {
  const currentPage = req.query.page;
  const pageSize = req.query.pageSize;
  const paginatedCustomers = await customerModel
    .find()
    .skip(pageSize * (currentPage - 1))
    .limit(pageSize);
  res.status(200).json({
    success: true,
    paginatedCustomers,
  });
};
exports.updateCustomer = async (req, res, next) => {
  const id = req.params.id;
  const { name, email, phone, loyalty_points } = req.body;
  const updatedCustomer = await customerModel.findByIdAndUpdate(id, {
    name,
    email,
    phone,
    loyalty_points,
  });
  res.status(200).json({
    success: true,
    updatedCustomer,
  });
};
exports.deleteOne = async (req, res, next) => {
  const id = req.params.id;
  const deleteCustomer = await customerModel.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    deleteCustomer,
  });
};
exports.deleteAllCustomer = async (req, res, next) => {
  await customerModel.deleteMany();
  res.status(200).json({
    success: true,
    message: "Delete All Customer",
  });
};