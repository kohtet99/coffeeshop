const mongoose = require("mongoose");
const validator = require("validator");
const AutoIncreasement=require("mongoose-sequence")(mongoose);
const customerSchema = new mongoose.Schema(
  {
    customer_id: Number,
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate: [validator.isEmail],
    },
    
    phone: {
      type: String,
      required: true,
    },
    loyalty_points: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

customerSchema.plugin(AutoIncreasement,{inc_field:"customer_id"});
const customerModel = mongoose.model("Customers", customerSchema);
module.exports = customerModel;
