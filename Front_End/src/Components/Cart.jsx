// Cart.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { X, Plus, Minus, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../CartSlice/CartSlice.jsx";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();

  

  // Safe calculations
  const totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price ?? 0) * item.quantity, 0);
  const tax = subtotal * 0.1;
  const shipping = subtotal > 100 ? 20 : 0;
  const total = subtotal + tax + shipping;

  const handleProceedToCheckout = () => {
    const storedUser = JSON.parse(localStorage.getItem('userInfo')); //read user from localStorage
  
  if (!storedUser) {
    //redirect to login page if user not logged in
    navigate('/auth/form');  
  } else if (!cartItems || cartItems.length === 0) {
    alert('Your cart is empty!');
  } else {
    //go to checkout if logged in + cart has items
    navigate('/checkout');
  }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 bg-white min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: Cart Items */}
          <div className="w-full lg:w-2/3">
            <div className="hidden pb-2 md:grid md:grid-cols-[2fr_0.7fr_1fr_1fr] gap-4 text-sm font-semibold text-gray-600 mb-2 px-2">
              <div className="text-left">Product</div>
              <div className="text-center">Price</div>
              <div className="text-center">Quantity</div>
              <div className="text-center">Total</div>
            </div>

            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.selectedColor}-${item.selectedSize || item.selectedDressSize}`}
                  className="grid grid-cols-1 md:grid-cols-[2fr_0.7fr_1fr_1fr] gap-2 items-center p-2 rounded-md bg-white shadow-[0_2px_12px_-3px_rgba(0,0,0,0.3)]"
                >
                  {/* Product Info */}
                  <div className="flex gap-4 items-center p-2">
                    <img
                      src={`${API_BASE_URL}${item.img}`}
                      alt={item.title || item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-semibold">{item.title || item.name}</h3>
                      {item.selectedColor && (
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-gray-500 text-sm">Color:</span>
                          <div
                            className="w-4 h-4 rounded-full border border-gray-300"
                            style={{ backgroundColor: item.selectedColor }}
                          />
                        </div>
                      )}
                      {(item.selectedSize || item.selectedDressSize) && (
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-gray-500 text-sm">Size:</span>
                          <span className="text-gray-700 text-sm">
                            {item.selectedSize || item.selectedDressSize}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-gray-700 font-medium flex items-center justify-center">
                    Rs. {(item.price ?? 0).toFixed(2)}
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center gap-2 justify-center">
                    <button
                      onClick={() =>
                        dispatch(
                          decreaseQuantity({
                            id: item.id,
                            selectedColor: item.selectedColor,
                            selectedSize: item.selectedSize,
                            selectedDressSize: item.selectedDressSize,
                          })
                        )
                      }
                      className="border border-gray-500 px-2 py-1 rounded disabled:opacity-50"
                      disabled={item.quantity === 1}
                    >
                      <Minus size={16} />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        dispatch(
                          increaseQuantity({
                            id: item.id,
                            selectedColor: item.selectedColor,
                            selectedSize: item.selectedSize,
                            selectedDressSize: item.selectedDressSize,
                          })
                        )
                      }
                      className="border border-gray-500 px-2 py-1 rounded"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  {/* Total & Remove */}
                  <div className="flex items-center justify-between md:justify-end gap-2">
                    <span className="font-semibold text-gray-800">
                      Rs. {((item.price ?? 0) * item.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() =>
                        dispatch(
                          removeFromCart({
                            id: item.id,
                            selectedColor: item.selectedColor,
                            selectedSize: item.selectedSize,
                            selectedDressSize: item.selectedDressSize,
                          })
                        )
                      }
                      className="text-gray-500 border border-gray-600 rounded-full p-1"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <a
                href="/"
                className="inline-flex items-center text-blue-600 hover:underline font-medium"
              >
                <ArrowLeft className="mr-2" size={18} />
                Continue Shopping
              </a>
            </div>
          </div>

          {/* Right: Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-md px-4 py-6 h-max shadow-[0_2px_12px_-3px_rgba(0,0,0,0.3)]">
              <ul className="text-gray-800 space-y-4 text-sm">
                <li className="flex justify-between">
                  Total Qty: <span className="font-bold">{totalQty}</span>
                </li>
                <li className="flex justify-between">
                  Total Items: <span className="font-bold">{cartItems.length}</span>
                </li>
                <li className="flex justify-between">
                  Subtotal: <span className="font-bold">Rs. {subtotal.toFixed(2)}</span>
                </li>
                <li className="flex justify-between">
                  Shipping: <span className="font-bold">Rs. {shipping.toFixed(2)}</span>
                </li>
                <li className="flex justify-between">
                  Tax: <span className="font-bold">Rs. {tax.toFixed(2)}</span>
                </li>
                <hr className="border-gray-300" />
                <li className="flex justify-between font-bold text-base">
                  Total: <span>Rs. {total.toFixed(2)}</span>
                </li>
              </ul>

              <div className="mt-8 space-y-2">
                <button
                  type="button"
                  onClick={handleProceedToCheckout}
                  className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-black hover:bg-gray-900 text-white rounded-md"
                >
                  Proceed to Checkout
                </button>

                <a
                  href="/"
                  className="block text-center text-sm px-4 py-2.5 w-full font-semibold tracking-wide border border-gray-300 text-gray-800 rounded-md"
                >
                  Continue Shopping
                </a>
              </div>

              <div className="mt-4 flex justify-center gap-4">
                <img
                  src="https://readymadeui.com/images/master.webp"
                  alt="MasterCard"
                  className="w-10 object-contain"
                />
                <img
                  src="https://readymadeui.com/images/visa.webp"
                  alt="Visa"
                  className="w-10 object-contain"
                />
                <img
                  src="https://readymadeui.com/images/american-express.webp"
                  alt="Amex"
                  className="w-10 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
