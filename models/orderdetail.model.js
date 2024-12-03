const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const orderDetailSchema = new mongoose.Schema(
  {
    orderDetail_id: {
      type: Number,
    },
    order_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      require: true,
    },
    product_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
       
      },
    ],
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

orderDetailSchema.plugin(AutoIncrement, { inc_field: "orderDetail_id" });

const orderDetailModel = mongoose.model("OrderDetail", orderDetailSchema);

module.exports = orderDetailModel;
