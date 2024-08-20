const CustomError = require("../Utils/customError.js");
const customerModel = require("../models/customer.model.js");
const employeeModel = require("../models/employee.model.js");

exports.register = async (req, res, next) => {
  const { name, email, password, phone, position } = req.body;

  const isEmailExists = await employeeModel.findOne({ email });
  if (isEmailExists) {
    return next(new CustomError("Email already exists!", 400));
  }

  const newEmployee = await employeeModel.create({
    name,
    email,
    password,
    phone,
    position,
  });
  res.status(201).json({
    success: true,
    newEmployee,
  });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new CustomError("Please enter email and password!", 400));
  }

  const user = await employeeModel.findOne(email);
  if (!user) {
    return next(new CustomError("Invalid email!", 400));
  }
  const isCorrectPassword = await user.comparePassword(password);
  if (!isCorrectPassword) {
    return next(new CustomError("Invalid password!", 400));
  }

  res.status(200).json({
    currentEmployee: user,
  });
};

exports.getEmployeeInfo = async (req, res, next) => {
  const id = req.params.id;

  const employeeInfo = await employeeModel.findById(id);

  if (!employeeInfo)
    return next(new CustomError("There is no employee in DB!", 400));

  res.status(200).json({
    success: true,
    employeeInfo,
  });
};

exports.getAllEmployee = async (req, res, next) => {
  const employees = await employeeModel.find();
  res.status(200).json({
    success: true,
    employees,
  });
};

exports.updateEmployee = async (req, res, next) => {
  const id = req.params.id;
  const newEmployee = await employeeModel.findByIdAndUpdate(id);
  if (!newEmployee) return next(new CustomError("There is no employee", 200));
  res.status(200).json({
    success: true,
    newEmployee,
  });
};

exports.deleteOne = async (req, res, next) => {
  const id = req.params.id;
  const deleteEmployee = await employeeModel.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    deleteEmployee,
  });
};

exports.deleteAll = async (req, res, next) => {
  const deleteEmployees = await employeeModel.deleteMany();

  res.status(200).json({
    success: true,
    deleteEmployees,
  });
};
