const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true
  },
  branchLocation: {
    type: String,
    required: true
  },
  orderItems: [
    {
      itemName: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      unitPrice: {
        type: Number,
        required: true,
      }
    }
  ],
  totalAmount: {
    type: mongoose.Types.Decimal128,
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'online']
  },
  orderStatus: {
    type: String,
    enum: ['pending', 'delivered', 'cancelled']
  },
  orderDate: {
    type: Date,
    default: Date.now
  }
});

ordersSchema.pre('save', function() {
  this.totalAmount = this.orderItems.reduce((sum, item) => {
    // Convert Decimal128 to Number for the calculation
    const price = Number(item.unitPrice.toString());
    return sum + (item.quantity * price);
  }, 0);
});

module.exports = mongoose.model('Order', ordersSchema);