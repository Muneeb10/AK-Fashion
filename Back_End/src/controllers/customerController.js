import Order from "../models/Order.js";

export const getCustomersWithOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email phone") // populate user fields
      .lean();

    const customers = orders.map(order => ({
      id: order._id,
      name: order.userId?.name || "",
      email: order.userId?.email || "",
      phone: order.userId?.phone || "",
      location: `${order.shippingAddress.city}, ${order.shippingAddress.country}`,
      orders: order.items?.length || 0,
      status: order.orderStatus,
      lastOrder: new Date(order.createdAt).toISOString().split("T")[0],
      orderId: order.orderId,
      totalAmount: order.totalAmount,
      paymentStatus: order.paymentStatus
    }));

    res.json(customers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Get single customer by ID
export const getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id)
      .populate("userId", "name email phone createdAt")
      .lean();

    if (!order) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const customerData = {
      id: order._id,
      name: order.userId?.name || "",
      email: order.userId?.email || "",
      phone: order.userId?.phone || "",
      street: order.shippingAddress?.street || "",
      city: order.shippingAddress?.city || "",
      state: order.shippingAddress?.state || "",
      postalCode: order.shippingAddress?.postalCode || "",
      country: order.shippingAddress?.country || "",
      joiningDate: order.userId?.createdAt
        ? new Date(order.userId.createdAt).toISOString().split("T")[0]
        : "",
      orders: order.items || [],
      status: order.orderStatus,
      lastOrder: new Date(order.createdAt).toISOString().split("T")[0],
      orderId: order.orderId,
      totalAmount: order.totalAmount,
      paymentStatus: order.paymentStatus
    };

    res.json(customerData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};