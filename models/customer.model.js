const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const customerSchema = new mongoose.Schema({
  customer_id: Number,
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

customerSchema.pre("save", async (next) => {
  if (!this.isModified("password")) next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

customerSchema.method.comparePassword = async (enterPassword) => {
  return await bcrypt.compare(enterPassword, this.password);
};

customerSchema.method.accessToken = async () => {
  return await jwt.sign({ id: this.id }, process.env.ACCESS_TOKEN_KEY, {
    expiresIn: "7d",
  });
};

customerSchema.plugin(AutoIncrement, { inc_field: "customer_id" });

const customerModel = mongoose.model("Customers", customerSchema);
module.exports = customerModel;
