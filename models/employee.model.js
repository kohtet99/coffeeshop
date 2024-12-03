const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const jwt=require("jsonwebtoken")

const employeeSchema = new mongoose.Schema(
  {
    employee_id: Number,
    name: String,
    position: String,
    email: String,
    password: {
      type: String,
      require: true,
      minlength: 6,
    },
    phone: String,
    salary: {
      type: Number,
      default: 0,
    },
    location:String,
    image_url:String,
    hire_date: {
      type: Date,
      default:Date.now(),
    },
    role: { 
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

employeeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

employeeSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

employeeSchema.plugin(AutoIncrement, { inc_field: "employee_id" });

employeeSchema.methods.accessToken = async function () {
  return await jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN_KEY, {
    expiresIn: "7d",
  });
};

const employeeModel = mongoose.model("Employees", employeeSchema);
module.exports = employeeModel;
