const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const employeeShiftSchema = new mongoose.Schema(
  {
    shift_id: {
      type: Number,
      require: true,
    },
    employee_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employees",
        require: true,
      },
    ],
    shift_date: String,
    start_time: String,
    end_time: String,
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  },
  {
    timestamps: true,
  }
);

employeeShiftSchema.plugin(AutoIncrement, { inc_field: "shift_id" });

const employeeShift = mongoose.model("EmployeeShifts", employeeShiftSchema);

module.exports = employeeShift;
