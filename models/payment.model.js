const mongoose = require("mongoose");

const paymentSchema= new mongoose.Schema(
    {
        order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order', // Reference to the 'Orders' collection
        required: true,
      },
        payment_date: {
        type: Date,
        required: true,
        default: Date.now,
      },
        amount: {
        type: Number,
        required: true,
      },
        payment_method: {
        type: String,
        required: true,
        enum: ['Cash', 'card', 'Kpay'], // Acceptable values
      },

    },
    {
      timestamps: true,
    }
);

module.exports = mongoose.model('Payment', paymentSchema);
    