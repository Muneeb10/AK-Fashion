import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface OrderFromAPI {
  productId: string;
  quantity: number;
  price: number;
  _id: string;
}

interface CustomerFromAPI {
  id: string;
  name: string;
  email: string;
  phone: string;
  location?: string;
  orders: OrderFromAPI[];
  status: string;
  lastOrder: string;
  orderId: string;
  totalAmount: number;
  paymentStatus: string;
  state?: string;
  city?: string;
  postalCode?: string;
  address?: string;
  joinDate?: string;
  street?: string;
}

interface OrderTableRow {
  id: string;
  date: string;
  amount: string;
  status: string;
  items: number;
}

export default function CustomersForm() {
  const { id } = useParams<{ id: string }>();
  const [customer, setCustomer] = useState<CustomerFromAPI | null>(null);
  const [orders, setOrders] = useState<OrderTableRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await axios.get<CustomerFromAPI>(`${API_BASE_URL}/api/customers/${id}`);
        const data = res.data;
        setCustomer(data);

        const mappedOrders: OrderTableRow[] = data.orders.map((order, index) => ({
          id: data.orderId || `ORD-${index + 1}`,
          date: data.lastOrder || "N/A",
          amount: `₨${order.price * order.quantity}`,
          status: data.status,
          items: order.quantity,
        }));

        setOrders(mappedOrders);
      } catch (err) {
        console.error("Error fetching customer:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCustomer();
    }
  }, [id]);

  if (loading) {
    return <div className="p-6 text-gray-600">Loading customer details...</div>;
  }

  if (!customer) {
    return <div className="p-6 text-red-600">Customer not found.</div>;
  }

  return (
    <div>
      <PageMeta
        title="AK Fashion | Customer Form"
        description="Customer details and order history page"
      />
      <PageBreadcrumb pageTitle="Customer Details" />

      <div className="rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        {/* Customer Details Form */}
        <div className="mb-10">
          <h3 className="mb-6 text-xl font-semibold text-gray-800 dark:text-white/90 sm:text-2xl">
            Customer Information
          </h3>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* First Column */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Customer ID
                </label>
                <input
                  type="text"
                  value={customer.id}
                  readOnly
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Phone
                </label>
                <input
                  type="tel"
                  value={customer.phone}
                  readOnly
                  className="w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  State
                </label>
                <input
                  type="text"
                  value={customer.state || ""}
                  readOnly
                  className="w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm"
                />
              </div>
            </div>

            {/* Second Column */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Full Name
                </label>
                <input
                  type="text"
                  value={customer.name}
                  readOnly
                  className="w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Join Date
                </label>
                <input
                  type="text"
                  value={customer.joinDate || "N/A"}
                  readOnly
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  City
                </label>
                <input
                  type="text"
                  value={customer.city || ""}
                  readOnly
                  className="w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm"
                />
              </div>
            </div>

            {/* Third Column */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  value={customer.email}
                  readOnly
                  className="w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Postal Code
                </label>
                <input
                  type="text"
                  value={customer.postalCode || ""}
                  readOnly
                  className="w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm"
                />
              </div>

              <div className="space-y-2 lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Street Address
                </label>
                <input
                  type="text"
                value={customer.street || ""}

                  readOnly
                  className="w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div>
          <h3 className="mb-6 text-xl font-semibold text-gray-600 dark:text-white/90 sm:text-2xl">
            Order History
          </h3>

          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="px-6 py-3">Order ID</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Amount</th>
                  <th className="px-6 py-3">Items</th>
                  <th className="px-6 py-3">Status</th>
                 
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr
                    key={index}
                    className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {order.id}
                    </td>
                    <td className="px-6 py-4">{order.date}</td>
                    <td className="px-6 py-4">{order.amount}</td>
                    <td className="px-6 py-4">{order.items}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : order.status === "Shipped"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            : order.status === "Processing"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                   
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">{orders.length}</span> of{" "}
              <span className="font-medium">{orders.length}</span> orders
            </div>
            <div className="flex space-x-2">
              <button className="rounded-lg border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-500">
                Previous
              </button>
              <button className="rounded-lg border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-500">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
