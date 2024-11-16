const orderModel = require("../models/order.model.js");
const customerModel = require("../models/customer.model");

exports.createOrder = async (req, res, next) => {
  try {
    const { orderId, customerId, totalAmount, orderStatus, orderDate } = req.body;

    // Find the customer by their ObjectId
    const customer = await customerModel.findById(customerId);

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Create the new order, linking the customer ObjectId
    const newOrder = new orderModel({
      orderId,
      customer_id: customer._id, // Linking the customer ObjectId to the order
      totalAmount,
      orderDate,
      orderStatus,
    });

    // Save the new order
    await newOrder.save();

    res.status(200).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.populate = async (req, res, next) => {
    try {
      const id = req.params.id;
      const order = await orderModel.findById(id).populate('customer_id');
  
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      console.log('Order with customer details:', order);
      res.status(200).json({ order });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  