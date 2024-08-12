const customerModel = require("../models/customer.model.js");

exports.create = async (req, res, next) => {
  const { customer_id, name, email, phone, password, loyalty_points } =
    req.body;
  await customerModel.create({
    customer_id,
    name,
    email,
    phone,
    password,
    loyalty_points,
  });

  res.status(200).json({
    message: "success",
  });
};
