import { useState, useEffect } from "react";
import { NavLink } from "react-router";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import { FilterIcon, EyeIcon, TrashBinIcon } from "../icons";
import axios from "axios";

interface Order {
  _id: string;
   orderId: string; // Add this
  product: string;
  customer: string;
  date: string;
  status: string;
  amount: number;
}

interface Filters {
  orderId: string;
  customer: string;
  status: string;
  minAmount: string;
  maxAmount: string;
  startDate: string;
  endDate: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    orderId: "",
    customer: "",
    status: "",
    minAmount: "",
    maxAmount: "",
    startDate: "",
    endDate: ""
  });

  // Fetch orders from backend
  useEffect(() => {
  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/orders`);

      console.log("API response:", res.data);

     const mappedOrders: Order[] = (res.data.orders || []).map((order: any) => ({
  _id: order._id,
  orderId: order.orderId || "", // store custom order ID
  product: order.items.map((item: any) => item.productId?.name).join(", "),
  customer: order.userId?.name || "Unknown",
  date: new Date(order.createdAt).toISOString().split("T")[0],
  status: order.orderStatus || "Unknown",
  amount: order.totalAmount,
}));

      setOrders(mappedOrders);
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false); // Always stop loading
    }
  };

  fetchOrders();
}, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const filteredOrders = orders.filter(order => {
    const orderAmount = order.amount;
    const orderDate = new Date(order.date);

    return (
      (filters.orderId === "" || order._id.toLowerCase().includes(filters.orderId.toLowerCase())) &&
      (filters.customer === "" || order.customer.toLowerCase().includes(filters.customer.toLowerCase())) &&
      (filters.status === "" || order.status === filters.status) &&
      (filters.minAmount === "" || orderAmount >= parseFloat(filters.minAmount)) &&
      (filters.maxAmount === "" || orderAmount <= parseFloat(filters.maxAmount)) &&
      (filters.startDate === "" || orderDate >= new Date(filters.startDate)) &&
      (filters.endDate === "" || orderDate <= new Date(filters.endDate))
    );
  });

  const resetFilters = () => {
    setFilters({
      orderId: "",
      customer: "",
      status: "",
      minAmount: "",
      maxAmount: "",
      startDate: "",
      endDate: ""
    });
  };

  const getStatusClass = (status: string) => {
  if (!status) return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";

  const statusLower = status.toLowerCase();

  switch (statusLower) {
    case "delivered":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case "shipped":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    case "processing":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    case "pending":
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    case "cancelled": //added
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
  }
};


  const handleStatusChange = async (orderId: string, newStatus: string) => {
    console.log(orderId);
    
  try {
    await axios.patch(`${API_BASE_URL}/api/orders/${orderId}`, { orderStatus: newStatus });

    setOrders(prevOrders =>
      prevOrders.map(order =>
        order._id === orderId ? { ...order, status: newStatus } : order
      )
    );
  } catch (err) {
    console.error("Error updating order status:", err);
  }
};

const handleDeleteOrder = async (orderId: string) => {
  if (!confirm("Are you sure you want to delete this order?")) return;
       console.log(orderId);
       
  try {
    await axios.delete(`${API_BASE_URL}/api/orders/${orderId}`);
    setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId)); // remove from UI
  } catch (err) {
    console.error("Error deleting order:", err);
  }
};

  return (
    <div>
      <PageMeta
        title="AK Fashion | Orders"
        description="View and manage your product orders"
      />
      <PageBreadcrumb pageTitle="Orders" />
      <div className="min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-lg transition hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <FilterIcon className="w-4 h-4" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        {showFilters && (
          <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Order ID Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Order ID</label>
                <input
                  type="text"
                  name="orderId"
                  value={filters.orderId}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Filter by order ID"
                />
              </div>

              {/* Customer Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Customer</label>
                <input
                  type="text"
                  name="customer"
                  value={filters.customer}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Filter by customer"
                />
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                <select
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">All Statuses</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Processing">Processing</option>
                  <option value="Pending">Pending</option>
                  <option value="Canceled">Canceled</option>
                </select>
              </div>

              {/* Min Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Min Amount ($)</label>
                <input
                  type="number"
                  name="minAmount"
                  value={filters.minAmount}
                  onChange={handleFilterChange}
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Minimum amount"
                />
              </div>

              {/* Max Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Max Amount ($)</label>
                <input
                  type="number"
                  name="maxAmount"
                  value={filters.maxAmount}
                  onChange={handleFilterChange}
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Maximum amount"
                />
              </div>

              {/* Date Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">From Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={filters.startDate}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">To Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={filters.endDate}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              {/* Reset */}
              <div className="flex items-end gap-2">
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
          {loading ? (
            <div className="p-6 text-center text-gray-500 dark:text-gray-400">
              Loading orders...
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                    Amount
                  </th>
                  <th className="px-6  py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-800">
                {filteredOrders.map(order => (
                  <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                     {order.orderId || order._id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {order.customer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
  <select
  value={order.status}
  onChange={(e) => handleStatusChange(order._id, e.target.value)}
  className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusClass(order.status)}`}
>
  <option value="Pending">Pending</option>
  <option value="Processing">Processing</option>
  <option value="Shipped">Shipped</option>
  <option value="Delivered">Delivered</option>
  <option value="Cancelled">Cancelled</option> {/* new option */}
</select>

</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      ${order.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex justify-center">
                        <NavLink
                          to={`/orders/invoice/${order._id}`}
                          className="text-blue-600 mr-2 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          <EyeIcon className="fill-gray-500 dark:fill-gray-400 w-5 h-5" />
                        </NavLink>
                        <button
    onClick={() => handleDeleteOrder(order._id)}
    className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-red-300"
  >
    <TrashBinIcon className="fill-red-500 w-5 h-5" />
  </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing <span className="font-medium">{filteredOrders.length}</span> of <span className="font-medium">{filteredOrders.length}</span> orders
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
