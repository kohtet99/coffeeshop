const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    order_id:Number,
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customers",
      
    },
    orderDate: {
      type: Date,
      default: Date.now(),
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    orderStatus: {
      type: String,
      enum: ["pending", "completed", "cancelled"], // Define possible statuses
      default: "completed",
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


const orderModel = mongoose.model("Order", orderSchema);

module.exports = orderModel;
