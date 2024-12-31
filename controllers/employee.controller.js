const CustomError = require("../Utils/customError.js");
const employeeModel = require("../models/employee.model.js");
exports.register = async (req, res, next) => {
  const {
    name,
    email,
    password,
    phone,
    position,
    salary,
    hire_date,
    location,
    role,
    url,
  } = req.body;
  const isEmailExists = await employeeModel.findOne({ email });
  if (isEmailExists) {
    return next(new CustomError("Email already exists!", 400));
  }
  // const image_url = `http://localhost:8080/uploads/${req.file.filename}`;
  const intRole = parseInt(role);
  let image_url = "";
  if (req.file) {
    image_url = `http://localhost:8080/uploads/${req.file.filename}`;
  } else {
    console.log(url);
    image_url = url;
  }
  // If email doesn't exist, proceed to create a new employee
  const newEmployee = await employeeModel.create({
    name,
    email,
    password,
    phone,
    position,
    salary,
    hire_date,
    location,
    image_url,
    role: intRole,
  });
  res.status(201).json({
    success: true,
    newEmployee,
  });
};
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  // Check if both email and password are provided
  if (!email || !password) {
    return next(new CustomError("Please enter email and password!", 400));
  }
  const user = await employeeModel.findOne({ email: email });
  if (!user) {
    return next(new CustomError("Invalid email!", 400));
  }
  // Compare entered password with the hashed password in the database
  const isCorrectPassword = await user.comparePassword(password);
  if (!isCorrectPassword) {
    return next(new CustomError("Invalid password!", 400));
  }
  const accessToken = await user.accessToken();
  // Send response with the user data
  res.status(200).json({
    success: true,
    accessToken,
    currentEmployee: user,
  });
};



exports.getEmployeeInfo = async (req, res, next) => {
  if (!req.user || !req.user._id) {
    return next(new CustomError('User not authenticated!', 401));
  }

  try {
    const id = req.user._id;
    const employeeInfo = await employeeModel.findById(id);

    if (!employeeInfo) {
      return next(new CustomError('There is no employee in DB!', 400));
    }

    res.status(200).json({
      success: true,
      employeeInfo,
    });
  } catch (err) {
    next(new CustomError('Something went wrong!', 500));
  }
};
exports.getEmployeesByDate = async (req, res) => {
  const startDate = req.query.startDate;
  const endDate = req.query.endDate || Date.now();
  const employees = await employeeModel
    .find({
      createdAt: { $gte: startDate, $lte: endDate },
    })
    .sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    employees,
  });
};

exports.getOneEmployee = async (req, res) => {
  const email = req.query.email;
  const employee = await employeeModel.findOne({ email });
  res.status(200).json({
    employee,
  });
};
exports.getAllEmployee = async (req, res, next) => {
  const employees = await employeeModel.find();
  const managers = await employeeModel.find({ position: "Manager" });
  const baristas = await employeeModel.find({ position: "Barista" });
  const cashiers = await employeeModel.find({ position: "Cashier" });
  const waiters = await employeeModel.find({ position: "Waiter" });
  const employeeCount = await employeeModel.countDocuments();
  res.status(200).json({
    success: true,
    employees,
    managers,
    baristas,
    cashiers,
    waiters,
    employeeCount,
  });
};
exports.getPaginationEmployee = async (req, res) => {
  const currentPage = req.query.page;
  const pageSize = req.query.pageSize;
  const paginatedEmployees = await employeeModel
    .find()
    .skip(pageSize * (currentPage - 1))
    .limit(pageSize);
  res.status(200).json({
    paginatedEmployees,
  });
};
exports.updateEmployee = async (req, res, next) => {
  const id = req.params.id;
  const {
    name,
    email,
    password,
    phone,
    position,
    salary,
    hire_date,
    location,
    url,
    role,
  } = req.body;
  let image_url = "";
  const intRole = parseInt(role);
  if (req.file) {
    image_url = `http://localhost:8080/uploads/${req.file.filename}`;
  } else {
    console.log(url);
    image_url = url;
  }
  const newEmployee = await employeeModel.findByIdAndUpdate(id, {
    name,
    email,
    password,
    phone,
    position,
    salary,
    hire_date,
    location,
    image_url,
    role: intRole,
  });
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









