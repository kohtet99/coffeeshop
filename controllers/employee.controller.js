const CustomError = require("../Utils/customError.js");
const employeeModel = require("../models/employee.model.js");

exports.register = async (req, res, next) => {
  const { name, email, password, phone, position } = req.body;

  const isEmailExists = employeeModel.findOne({ email });
  //   if (isEmailExists) {
  //     return next(new CustomError("Email already exists!", 400));
  //   }

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
