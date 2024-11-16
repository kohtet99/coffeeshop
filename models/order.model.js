const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const orderSchema = new mongoose.Schema(
  {
    order_id: {
      type: Number,
      require: true,
    },
    customer_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customers",
        require: true,
      },
    ],
    order_date: {
      type: Date,
      default: Date.now,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    orderStatus: {
      type: String,
      enum: ["pending", "completed", "cancelled"], // Define possible statuses
      default: "pending",
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

orderSchema.plugin(AutoIncrement, { inc_field: "order_id" });

const orderModel = mongoose.model("Order", orderSchema);

module.exports = orderModel;
