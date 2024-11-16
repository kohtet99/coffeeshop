const mongoose = require("mongoose");
const validator = require("validator");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const supplierSchema = new mongoose.Schema(
  {
    supplier_id: Number,
    name: {
      type: String,
      required: true,
    },
    contact_person: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: [validator.isEmail],
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

supplierSchema.plugin(AutoIncrement, { inc_field: "supplier_id" });

const Suppliers = mongoose.model("Suppliers", supplierSchema);
module.exports = Suppliers;
