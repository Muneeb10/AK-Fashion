import { useEffect, useState } from "react";
import { useParams } from "react-router";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import { PrinterIcon } from "../icons";
import axios from "axios";
import "../Print.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface ProductItem {
  productId: string;
  name: string;
  sku: string;
  quantity: number;
  price: number;
}

interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

interface Order {
  _id: string;
  orderId?: string;
  userId: User;
  items: ProductItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  paymentStatus?: string;
  orderStatus: string;
  createdAt: string;
  totalAmount: number;
  files?: string[];
}

export default function ShippingInvoice() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        console.log("Fetching order with ID:", id);
        const res = await axios.get(`${API_BASE_URL}/api/orders/${id}`);
        console.log("API Response:", res.data);
        
        // Check different possible response structures
        if (res.data.success) {
          if (res.data.order) {
            // Case 1: Data is in res.data.order
            setOrder(res.data.order);
          } else if (res.data.orders && res.data.orders.length > 0) {
            // Case 2: Data is in res.data.orders array
            setOrder(res.data.orders[0]);
          } else if (res.data.data) {
            // Case 3: Data is in res.data.data
            setOrder(res.data.data);
          } else {
            setError("Order not found in response");
          }
        } else {
          setError(res.data.message || "Order not found");
        }
      } catch (err: any) {
        console.error("Error fetching order:", err);
        setError(err.response?.data?.message || "Failed to load order data");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOrder();
    } else {
      setError("No order ID provided");
      setLoading(false);
    }
  }, [id]);

  // Add debug logging
  console.log("Current order state:", order);
  console.log("Loading:", loading);
  console.log("Error:", error);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Error: {error}</p>;
  if (!order) return <p className="text-center mt-10">Order not found</p>;

  const customer = {
    name: order.userId?.name || "N/A",
    email: order.userId?.email || "N/A",
    phone: order.userId?.phone || "N/A",
    shippingAddress: order.shippingAddress
      ? `${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.postalCode}, ${order.shippingAddress.country}`
      : "N/A",
  };

  const products = order.items.map((item, index) => ({
    id: index + 1,
    name: item.name,
    sku: item.sku,
    price: item.price,
    quantity: item.quantity,
  }));

  // Calculate order totals
  const subtotal = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );
  
  // Check if payment method is easypaisa_jazzcash for 15% discount
  const isDiscountEligible = order.paymentMethod === "easypaisa_jazzcash";
  const discountPercentage = isDiscountEligible ? 0.15 : 0;
  const discountAmount = subtotal * discountPercentage;
  
  // const tax = subtotal * 0.1;
  // const shippingCost = subtotal > 100 ? 20 : 0;
  const total = subtotal - discountAmount;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <PageMeta title="AK Fashion | Invoice" description="Online shipping product invoice" />
      <PageBreadcrumb pageTitle="Shipping Invoice" />

      <div className="print-container min-h-screen rounded-2xl border border-gray-200 bg-white px-5 py-7 dark:border-gray-800 dark:bg-white/[0.03] xl:px-10 xl:py-12">
        <div className="mx-auto w-full max-w-5xl">
          {/* Invoice Header */}
          <div className="flex flex-col justify-between md:flex-row md:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-serif tracking-tight">
                Shipping Invoice
              </h1>
              <div className="mt-2 flex items-center space-x-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  <span className="text-gray-500 dark:text-gray-500">Order #</span>
                  <span className="ml-1 text-gray-800 dark:text-gray-300">{order.orderId || order._id}</span>
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  <span className="text-gray-500 dark:text-gray-500">Date: </span>
                  <span className="ml-1 text-gray-800 dark:text-gray-300">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </p>
              </div>
            </div>
            <div className="mt-4 flex flex-col items-end space-y-2 md:mt-0">
              <div className="flex items-center space-x-3">
                <button 
                  onClick={handlePrint}
                  className="flex items-center rounded border border-gray-300 px-3 py-1.5 text-sm font-medium hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800 transition-colors"
                >
                  <PrinterIcon className="mr-1.5 h-4 w-4" /> Print
                </button>
              </div>
            </div>
          </div>

          {/* Shipping Info */}
          <div className="my-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-gray-200 p-5 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
              <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">Shipping To</h3>
              <p className="whitespace-pre-line text-gray-700 dark:text-gray-300 font-medium leading-relaxed">{customer.shippingAddress}</p>
            </div>

            <div className="rounded-lg border border-gray-200 p-5 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
              <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">Customer Information</h3>
              <div className="space-y-1.5 text-gray-700 dark:text-gray-300">
                <p className="font-medium">{customer.name}</p>
                <p className="text-gray-600 dark:text-gray-400">{customer.email}</p>
                <p className="text-gray-600 dark:text-gray-400">{customer.phone}</p>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 p-5 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
              <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">Payment Method</h3>
              <p className="font-medium text-gray-900 dark:text-white">{order.paymentMethod}</p>
              {isDiscountEligible && (
                <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                  15% discount applied
                </p>
              )}
            </div>
          </div>

          {/* Products and Order Summary */}
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Products Table */}
            <div className="flex-1 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">SKU</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">Price</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">Qty</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900/50">
                  {products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{product.name}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{product.sku}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 dark:text-gray-400 text-right">Rs. {product.price.toFixed(2)}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 dark:text-gray-400 text-right">{product.quantity}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white text-right">Rs. {(product.price * product.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Invoice Summary */}
            <div className="w-full lg:w-80">
              <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
                <h3 className="mb-5 text-xl font-semibold text-gray-900 dark:text-white border-b pb-3 dark:border-gray-700">Order Summary</h3>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                    <span className="font-medium text-gray-900 dark:text-white">Rs. {subtotal.toFixed(2)}</span>
                  </div>
                  
                  {/* Discount row - only show if eligible */}
                  {isDiscountEligible && (
                    <div className="flex justify-between text-green-600 dark:text-green-400">
                      <span>Discount (15%):</span>
                      <span className="font-medium">- Rs. {discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  {/* <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Shipping:</span>
                    <span className="font-medium text-gray-900 dark:text-white">${shippingCost.toFixed(2)}</span>
                  </div> */}
                  {/* <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Tax (10%):</span>
                    <span className="font-medium text-gray-900 dark:text-white">${tax.toFixed(2)}</span>
                  </div> */}
                  <div className="flex justify-between border-t border-gray-200 pt-4 text-lg font-semibold dark:border-gray-700">
                    <span className="text-gray-900 dark:text-white">Total:</span>
                    <span className="text-gray-900 dark:text-white">Rs. {total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Images */}
        {order.files && order.files.length > 0 && (
          <div className="mt-8">
            <div className="w-full p-4 bg-gray-100 rounded-lg flex flex-wrap gap-4 justify-center">
              {order.files.map((file, index) => (
                <div key={index} className="flex flex-col h-[500px] items-center bg-white rounded-md shadow p-3">
                  <img
                    src={`${API_BASE_URL}${file}`}
                    alt={`Product ${index + 1}`}
                    className="w-full h-full object-contain rounded"
                    onError={(e) => {
                      // Fallback if image fails to load
                      e.currentTarget.src = 'https://via.placeholder.com/128?text=Image+Not+Found';
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
