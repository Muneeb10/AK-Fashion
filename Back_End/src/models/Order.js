import mongoose from 'mongoose';

// Order Item Schema
const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
   name: {          // <-- store product name
    type: String,
    required: true
  },
  sku: {           // <-- store product SKU
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true,
    min: 0
  }
});

// Order Schema
const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    unique: true,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [orderItemSchema],
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  shippingAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true }
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['easypaisa_jazzcash', 'cash_on_delivery']
  },
   discountApplied: {
    type: String,
    default: '0%'
  },
  paymentStatus: {
    type: String,
    default: 'pending_verification',
    enum: ['pending_verification', 'pending_delivery', 'paid', 'failed']
  },
  orderStatus: {
    type: String,
    default: 'processing',
    enum: ['processing', 'shipped', 'delivered', 'cancelled']
  },
  files: [
    {
      type: String, // store file path as string
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Auto-update updatedAt before save
orderSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Auto-generate orderId before validation
orderSchema.pre('validate', async function (next) {
  if (!this.orderId) {
    const year = new Date().getFullYear();
    const count = await mongoose.model('Order').countDocuments({}) + 1;
    this.orderId = `#ORD-${year}-${String(count).padStart(4, '0')}`;
  }
  next();
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
