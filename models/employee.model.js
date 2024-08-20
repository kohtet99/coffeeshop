const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const AutoIncrement = require("mongoose-sequence")(mongoose);

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

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

employeeSchema.method.comparePassword = async (enterPassword) => {
  return await bcrypt.compare(enterPassword, this.password);
};

employeeSchema.plugin(AutoIncrement, { inc_field: "employee_id" });

const employeeModel = mongoose.model("Employees", employeeSchema);
module.exports = employeeModel;
