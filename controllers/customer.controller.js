const CustomError = require("../Utils/customError.js");
const customerModel = require("../models/customer.model.js");

exports.register = async (req, res, next) => {
  const { customer_id, name, email, phone, password, loyalty_points } =
    req.body;

  const isEmail = customerModel.findOne({ email });
  if (isEmail) {
    return next(new CustomError("Email is already exist!", 400));
  }

  const newCustomer = await customerModel.create({
    customer_id,
    name,
    email,
    phone,
    password,
    loyalty_points,
  });

  res.status(200).json({
    message: "success",
    newCustomer,
  });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new CustomError("Please enter email and password!", 400));
  }
  const user = await customerModel.findOne({ email });
  if (!user) return next(new CustomError("Invalid email!", 400));
  const isCorrectPassword = await user.comparePassword(password);
  if (!isCorrectPassword)
    return next(new CustomError("Invalid password!", 400));

  const token = await user.accessToken();
  res.status(200).json({
    token,
    user,
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

  res.status(200).json({
    success: true,
    customers,
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

exports.updateCustomer = async (req, res, next) => {
  const id = req.params.id;
  const { customer_id, name, email, phone, password, loyalty_points } =
    req.body;

  const newCustomer = await customerModel.findByIdAndUpdate(id, {
    customer_id,
    name,
    email,
    phone,
    password,
    loyalty_points,
  });

  res.status(200).json({
    success: true,
    newCustomer,
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
