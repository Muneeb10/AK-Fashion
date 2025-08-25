import Order from "../models/Order.js";
import User from "../models/User.js";
import Product from "../models/Product.js";

/**
 * Create a new order
 */
// controllers/orderController.js
// controllers/orderController.js
export const createOrder = async (req, res) => {
  try {
    // Extract data from form-data
    const { 
      userId, 
      items, 
      totalAmount, 
      discountApplied,
      paymentMethod 
    } = req.body;

    // Extract shipping address fields
    const shippingAddress = {
      street: req.body['shippingAddress[street]'] || '',
      city: req.body['shippingAddress[city]'] || '',
      state: req.body['shippingAddress[state]'] || '',
      postalCode: req.body['shippingAddress[postalCode]'] || '',
      country: req.body['shippingAddress[country]'] || 'US'
    };

    // Validate required fields
    if (!userId || !items || !totalAmount || !paymentMethod) {
      return res.status(400).json({ 
        success: false, 
        message: "Missing required fields: userId, items, totalAmount, paymentMethod" 
      });
    }

    // Parse items array (it comes as string from form-data)
    let parsedItems;
    try {
      parsedItems = typeof items === "string" ? JSON.parse(items) : items;
    } catch (err) {
      console.error('Error parsing items:', err);
      return res.status(400).json({ 
        success: false, 
        message: "Invalid items format. Expected JSON array." 
      });
    }

    if (!Array.isArray(parsedItems) || parsedItems.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: "Items must be a non-empty array" 
      });
    }

    // Check user exists
    const userExists = await User.exists({ _id: userId });
    if (!userExists) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    // Handle uploaded files
    let uploadedFiles = [];
    if (req.files && req.files.length > 0) {
      uploadedFiles = req.files.map(file => `/uploads/${file.filename}`);
    }

    // Set payment status
    const paymentStatus = paymentMethod === 'cash_on_delivery' ? 
      'pending_delivery' : 'pending_verification';

    // Create order
    const order = new Order({
      userId,
      items: parsedItems,
      totalAmount: parseFloat(totalAmount),
      discountApplied: discountApplied || '0%',
      shippingAddress,
      paymentMethod,
      paymentStatus,
      files: uploadedFiles,
    });

    const savedOrder = await order.save();

    // Populate and return the order
    const populatedOrder = await Order.findById(savedOrder._id)
      .populate("userId", "name email phone")
      .populate("items.productId", "name price sku");

    res.status(201).json({ 
      success: true, 
      message: "Order created successfully", 
      order: populatedOrder 
    });

  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ 
      success: false, 
      message: "Server error creating order", 
      error: error.message 
    });
  }
};


/**
 * Get all orders
 */
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email phone")
      .populate("items.productId", "name price sku")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: orders.length, orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

/**
 * Get single order by ID
 */
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("userId", "name email phone")
      .populate("items.productId", "name price sku");

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

/**
 * Update order status
 */
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus, status } = req.body;
    const newStatus = orderStatus || status; // accept either key

    const validStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"];

    if (!newStatus || !validStatuses.includes(newStatus.toLowerCase())) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus: newStatus },
      { new: true }
    )
      .populate("userId", "name email phone")
      .populate("items.productId", "name price sku");

    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    res.status(200).json({ success: true, message: "Order status updated", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};



export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    console.error("Delete order error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

/**
 * Get orders by user ID
 */
export const getOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const userExists = await User.exists({ _id: userId });
    if (!userExists) return res.status(404).json({ success: false, message: "User not found" });

    const orders = await Order.find({ userId })
      .populate("userId", "name email phone")
      .populate("items.productId", "name price sku")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: orders.length, orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
