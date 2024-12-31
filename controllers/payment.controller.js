const Payment = require('../models/payment.model.js');
const Order = require('../models/order.model.js'); // Ensure you have this model

// Create a new payment
exports.createPayment = async (req, res) => {
  try {
    const { order_id, payment_date, amount, payment_method } = req.body;

    // Ensure the referenced order exists
    const order = await Order.findById(order_id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Create payment
    const payment = new Payment({
      order_id,
      payment_date,
      amount,
      payment_method,
    });

    await payment.save();
    res.status(201).json({ message: 'Payment created successfully', payment });
  } catch (error) {
    res.status(500).json({ message: 'Error creating payment', error: error.message });
  }
};

// Get all payments
exports.getPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate('order_id'); // Adjust fields based on your Order schema
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching payments', error: error.message });
  }
};

// Get a single payment by ID
exports.getOnePayment = async (req, res) => {
  try {
    const id = req.params.id;

    // Find the payment by order_id (assuming you are using order_id as the identifier)
    const payment = await Payment.findOne({ order_id: id }).populate("order_id");

    if (!payment) {
      return res.status(404).json({ message: 'Payment details not found' });
    }

    res.status(200).json({
      success: true,
      payment,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching payment details', error: error.message });
  }
};

exports.getPaymentByDate = async (req, res) => {
  const startDate = req.query.startDate;
  const endDate = req.query.endDate || Date.now();
  const payment = await Payment
    .find({
      createdAt: { $gte: startDate, $lte: endDate },
    })
    .sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    payment,
  });
};


// Update a payment
exports.updatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const payment = await Payment.findByIdAndUpdate(id, updates, { new: true });

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.status(200).json({ message: 'Payment updated successfully', payment });
  } catch (error) {
    res.status(500).json({ message: 'Error updating payment', error: error.message });
  }
};

// Delete a payment
exports.deletePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await Payment.findByIdAndDelete(id);

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.status(200).json({ message: 'Payment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting payment', error: error.message });
  }
};
