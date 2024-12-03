const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const productSchema = new mongoose.Schema(
  {
    product_id: Number,
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
    },
    discount: {
      type: Number,
      default: 0,
    },
    reorderlevel: {
      type: Number,
      default: 0,
    },
    origin: {
      type: String,
    },
    ingredients: {
      type: String,
    },
    category: {
      type: String,
      trim: true,
    },
    stock_quantity: {
      type: Number,
      default: 0,
    },
    supplier_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Suppliers",
      },
    ],
    image_url: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.plugin(AutoIncrement, { inc_field: "product_id" });

const productModel = mongoose.model("Products", productSchema);
module.exports = productModel;
