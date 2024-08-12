const mongoose = require("mongoose");
const validator = require("validator");

const customerSchema = new mongoose.Schema({
  customer_id: {
    type: Number,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: [validator.isEmail],
  },
  password: {
    type: String,
    require: true,
    minLength: 6,
  },
  phone: {
    type: String,
    unique: true,
    required: true,
  },
  loyalty_points: {
    type: Number,
    default: 0,
  },
});

const customerModel = mongoose.model("Customers", customerSchema);
module.exports = customerModel;
