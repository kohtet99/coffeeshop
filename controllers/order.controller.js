const orderModel = require("../models/order.model.js");
const customerModel = require("../models/customer.model.js");

exports.createOrder = async (req, res, next) => {
  try {
    const { customerId, totalAmount, orderStatus, orderDate } = req.body;

    // Find the customer by their ObjectId
    const customer = await customerModel.findById(customerId);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Create the new order, linking the customer ObjectId
    const newOrder = new orderModel({
      customer_id: customer._id, // Linking the customer ObjectId to the order
      totalAmount,
      orderDate,
      orderStatus,
    });

    // Save the new order
    await newOrder.save();

  res.status(201).json({newOrder});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.populate = async (req, res, next) => {
  try {
    const id = req.params.id;
    const order = await orderModel.findById(id).populate("customer_id");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    console.log("Order with customer details:", order);
    res.status(201).json({ order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  const orders = await orderModel.find().populate("customer_id");
  const orderCount = await orderModel.countDocuments();
  const completedOrder = await orderModel.countDocuments({
    orderStatus: "completed",
  });
  const pendingOrder = await orderModel.countDocuments({
    orderStatus: "pending",
  });
  const cancelledOrder = await orderModel.countDocuments({
    orderStatus: "cancelled",
  });

  if (!orders) {
    return res.status(404).json({ message: "Orders not found" });
  }

  res.status(200).json({
    success: true,
    count: orderCount,
    completedCount: completedOrder,
    pendingCount: pendingOrder,
    cancelledCount: cancelledOrder,
    orders,
  });
};

exports.getPaginateOrders = async (req, res) => {
  const currentPage = parseInt(req.query.page, 10) || 1;
  const pageSize = parseInt(req.query.pageSize, 10) || 10;
  const { startDate, endDate } = req.query;

  const filter = {};

  // Add date filtering if startDate and endDate are provided
  if (startDate && endDate) {
    filter.orderDate = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
  }

  try {
    const orders = await orderModel
      .find(filter).sort({createdAt:-1})
      .populate("customer_id");

    const totalOrders = await orderModel.countDocuments(filter);

    res.status(200).json({
      success: true,
      orders,
      pagination: {
        currentPage,
        totalPages: Math.ceil(totalOrders / pageSize),
        totalOrders,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
