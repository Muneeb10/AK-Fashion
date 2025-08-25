// src/Components/OrderConfirmation.jsx
import React from "react";
import { CheckCircle, ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router";



const OrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderId } = location.state || {};// retrieve orderId from navigate state


  console.log(orderId);
  

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-white rounded-lg shadow-md p-8 text-center">
        <CheckCircle className="mx-auto text-green-500 mb-4" size={64} />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Thank You!
        </h1>
        <p className="text-gray-700 mb-2">
          Your order has been successfully placed.
        </p>
        {orderId && (
          <p className="text-gray-900 font-semibold mb-6">
            Order ID: {orderId}
          </p>
        )}
        {/* <p className="text-gray-700 mb-6">
          We’ll send you an email confirmation shortly.
        </p> */}

        <div className="flex flex-col mt-10 sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-md hover:bg-gray-900 transition"
          >
            <ArrowLeft size={16} />
            Continue Shopping
          </button>

          <button
            onClick={() => navigate("/cart")}
            className="bg-gray-100 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-200 transition"
          >
            View My Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
