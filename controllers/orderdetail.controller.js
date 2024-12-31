const orderModel = require("../models/order.model.js");
const orderDetailModel = require("../models/orderdetail.model.js");
const productModel = require("../models/product.model.js");

exports.createOrderDetail = async (req, res, next) => {
  try {
    const { orderDetailId, orderId, productId, quantity, price } = req.body;

    // Find the customer by their ObjectId
    // const order = await orderModel.findOne({ order_id: orderId });
    // const product = await productModel.findOne({ product_id: productId }); //product_id is in database

    // if (!order && !product) {
    //   return res.status(404).json({ message: "Order not found" });
    // }

    // Create the new order, linking the customer ObjectId
    const newOrderDetail = new orderDetailModel({
      orderDetailId,
      order_id: orderId, // Linking the order ObjectId to the orderdetail
      product_id: productId,
      quantity: quantity,
      price: price,
    });

    // Save the new order
    await newOrderDetail.save();

    res.status(201).json({newOrderDetail});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// exports.populate = async (req, res, next) => {
//     try {
//       const id = req.params.id;
//       const orderDetail = await orderDetailModel.findOne({orderDetail_id:id}).populate('order_id');
//       const product=await orderDetailModel.findOne({product_id:id}).populate('product_id');

//       if (!orderDetail && !product) {
//         return res.status(404).json({ message: 'OrderDetail or product not found' });
//       }

//       console.log('OrderDetail with order details:', orderDetail);
//       res.status(200).json({ orderDetail,product });
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   };

exports.populateOrderDetails = async (req, res, next) => {
  try {
    const id = req.params.id;

    // Find the orderDetail by either orderDetail_id or product_id
    const orderDetail = await orderDetailModel
      .findOne({ order_id: id })
      .populate("order_id")
      .populate("product_id");

    if (!orderDetail) {
      return res.status(404).json({ message: "OrderDetail not found" });
    }


    res.status(200).json({ orderDetail });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getOrderDetails = async (req, res) => {
  const startDate = req.query.startDate;
  const endDate = req.query.endDate || Date.now();
  try {
    const orderDetails = await orderDetailModel
      .find({
        createdAt: { $gte: startDate, $lte: endDate },
      })
      .sort({ createdAt: -1 })
      .populate("order_id")
      .populate("product_id");
    res.status(200).json({
      success: true,
      orderDetails,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deletedOrderDetails = async (req, res) => {
  const id = req.params.id;
  const deletedOrderDetails = await orderDetailModel.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    deletedOrderDetails,
  });
};
