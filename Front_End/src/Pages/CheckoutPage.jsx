import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';

import easy_pessa_logo from '../assets/Easypaisa-logo.png';
import jazz_cash_logo from '../assets/Jazz-Cash-logo.jpg';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const CheckoutPage = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);

  // Get logged-in user from localStorage
  const storedUser = JSON.parse(localStorage.getItem('user'));

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    paymentMethod: 'cash_on_delivery', // Default to cash on delivery
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    files: [],
  });

  // Prefill user data
  useEffect(() => {
    if (storedUser) {
      const [firstName, ...lastNameArr] = storedUser.name ? storedUser.name.split(' ') : ['', ''];
      setFormData((prev) => ({
        ...prev,
        firstName: firstName || '',
        lastName: lastNameArr.join(' ') || '',
        email: storedUser.email || '',
        phone: storedUser.phone || '',
        address: storedUser.address || '',
        city: storedUser.city || '',
        state: storedUser.state || '',
        zipCode: storedUser.zipCode || '',
        country: storedUser.country || 'US'
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({ ...prev, files }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!cartItems || cartItems.length === 0) return;

  const storedUser = JSON.parse(localStorage.getItem('userInfo'));
  if (!storedUser) {
    alert('Please login to place an order.');
    navigate('/auth/form');
    return;
  }

  try {
    const orderData = new FormData();
    orderData.append("userId", storedUser._id || storedUser.email);

    // Format items correctly
    const itemsData = cartItems.map((item) => ({
      productId: item._id || item.id,
      name: item.title || item.name,
      sku: item.sku || 'N/A',
      quantity: item.quantity,
      price: Number(item.newPrice || item.price) || 0
    }));
    
    orderData.append("items", JSON.stringify(itemsData));

    // Calculate total amount with discount
    let totalAmount = cartItems.reduce(
      (sum, item) => sum + ((item.newPrice || item.price) * item.quantity),
      0
    );
    
    if (formData.paymentMethod === 'easypaisa_jazzcash') {
      totalAmount = totalAmount * 0.85; // 15% discount
    }
    
    orderData.append("totalAmount", totalAmount.toString());
    orderData.append("discountApplied", formData.paymentMethod === 'easypaisa_jazzcash' ? "15%" : "0%");

    // Shipping address
    orderData.append("shippingAddress[street]", formData.address || 'N/A');
    orderData.append("shippingAddress[city]", formData.city || 'N/A');
    orderData.append("shippingAddress[state]", formData.state || 'N/A');
    orderData.append("shippingAddress[postalCode]", formData.zipCode || 'N/A');
    orderData.append("shippingAddress[country]", formData.country || 'US');
    
    // Payment method
    orderData.append("paymentMethod", formData.paymentMethod);

    // Add files only for easypaisa_jazzcash
    if (formData.paymentMethod === 'easypaisa_jazzcash' && formData.files && formData.files.length > 0) {
      Array.from(formData.files).forEach((file) => {
        orderData.append("files", file);
      });
    }

    const res = await axios.post(`${API_BASE_URL}/api/orders`, orderData, {
      headers: { 
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${localStorage.getItem('token')}` // if using auth
      },
    });

    console.log('Order placed:', res.data);
    navigate('/order-confirmation', { state: { orderId: res.data?.order?.orderId } });
    
  } catch (err) {
    console.error('Failed to place order:', err.response?.data || err.message);
    alert('Failed to place order. Please check all fields and try again.');
  }
}; // <-- This closing parenthesis was missing

  const subtotal = cartItems.reduce(
    (sum, item) => sum + ((item.newPrice || item.price) * item.quantity),
    0
  );
  
  // Calculate discount and total based on payment method
  const discount = formData.paymentMethod === 'easypaisa_jazzcash' ? subtotal * 0.15 : 0;
  const total = subtotal - discount;
  const totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="max-w-6xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
        <button
          onClick={() => navigate('/')}
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-6 cursor-pointer" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} className="mr-2" />
          <span className="text-sm font-medium">Back to Cart</span>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Form */}
          <div className="lg:w-1/2">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Customer Information</h2>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                {/* Shipping Address */}
                <div className="mb-6">
                  <h3 className="text-md font-medium text-gray-900 mb-4">Shipping Address</h3>
                  <input
                    type="text"
                    name="address"
                    placeholder="Street Address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
                    required
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                    <input
                      type="text"
                      name="zipCode"
                      placeholder="ZIP"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                </div>


                {/* Payment Method Selection */}
                <div className="mb-6">
                  <h3 className="text-md font-medium text-gray-900 mb-4">Payment Method</h3>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <input
                        type="radio"
                        id="cash_on_delivery"
                        name="paymentMethod"
                        value="cash_on_delivery"
                        checked={formData.paymentMethod === 'cash_on_delivery'}
                        onChange={handleChange}
                        className="hidden"
                      />
                      <label
                        htmlFor="cash_on_delivery"
                        className={`block p-4 border rounded-md cursor-pointer text-center ${
                          formData.paymentMethod === 'cash_on_delivery'
                            ? 'border-black bg-gray-100'
                            : 'border-gray-300'
                        }`}
                      >
                        Cash on Delivery
                      </label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="easypaisa_jazzcash"
                        name="paymentMethod"
                        value="easypaisa_jazzcash"
                        checked={formData.paymentMethod === 'easypaisa_jazzcash'}
                        onChange={handleChange}
                        className="hidden"
                      />
                      <label
                        htmlFor="easypaisa_jazzcash"
                        className={`block p-4 border rounded-md cursor-pointer text-center ${
                          formData.paymentMethod === 'easypaisa_jazzcash'
                            ? 'border-black bg-gray-100'
                            : 'border-gray-300'
                        }`}
                      >
                        Easypaisa / JazzCash
                        <span className="block text-green-600 text-sm font-semibold mt-1">
                          15% Discount
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Payment Details based on selection */}
                  {formData.paymentMethod === 'easypaisa_jazzcash' && (
                    <div className="bg-gray-50 p-4 rounded-md">
                      <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 mb-4">
                        {/* EasyPaisa */}
                        <div className="flex-1">
                          <div className="flex items-center bg-white shadow-md rounded-2xl p-4">
                            <img
                              src={easy_pessa_logo}
                              alt="EasyPaisa"
                              className="w-16 h-16 object-cover"
                            />
                            <div className="ml-4">
                              <h2 className="text-lg font-semibold text-gray-800">SAFIA</h2>
                              <p className="text-gray-600 text-sm">0349-2443739</p>
                            </div>
                          </div>
                        </div>

                        {/* JazzCash */}
                        <div className="flex-1">
                          <div className="flex items-center bg-white shadow-md rounded-2xl p-4">
                            <img
                              src={jazz_cash_logo}
                              alt="JazzCash"
                              className="w-16 h-16 object-cover"
                            />
                            <div className="ml-4">
                              <h2 className="text-lg font-semibold text-gray-800">Abdullah Nadeem</h2>
                              <p className="text-gray-600 text-sm">0322-4095963</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* File Upload */}
                      <div>
                        <h3 className="text-md font-medium text-gray-900 mb-2">Upload Payment Proof</h3>
                        <input
                          type="file"
                          name="files"
                          multiple
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          required={formData.paymentMethod === 'easypaisa_jazzcash'}
                        />
                        <p className="text-sm text-gray-500 mt-1">
                          Please upload screenshot or proof of your payment.
                        </p>
                      </div>
                    </div>
                  )}

                  {formData.paymentMethod === 'cash_on_delivery' && (
                    <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
                      <p className="text-blue-800">
                        You will pay with cash when your order is delivered.
                      </p>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800"
                >
                  Place Order
                </button>
              </form>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:w-1/2">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-8">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <div
                    key={`${item._id}-${item.selectedColor}-${item.selectedSize || item.selectedDressSize}`}
                    className="py-4 flex"
                  >
                    <img src={`${API_BASE_URL}${item.img}`} alt={item.title} className="w-20 h-20 rounded-md object-cover" />
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between font-medium text-gray-900">
                        <h3>{item.title}</h3>
                        <p>Rs. {(item.newPrice || item.price).toFixed(2)}</p>
                      </div>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      {item.selectedColor && <p className="text-sm text-gray-500">Color: {item.selectedColor}</p>}
                      {(item.selectedSize || item.selectedDressSize) && (
                        <p className="text-sm text-gray-500">Size: {item.selectedSize || item.selectedDressSize}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 border-t pt-6">
                <div className="flex justify-between mb-2 text-sm">
                  <span>Quantity:</span>
                  <span>{totalQty}</span>
                </div>
                <div className="flex justify-between mb-2 text-sm">
                  <span>Items:</span>
                  <span>{cartItems.length}</span>
                </div>
                <div className="flex justify-between mb-2 text-sm">
                  <span>Subtotal:</span>
                  <span>Rs. {subtotal.toFixed(2)}</span>
                </div>
                
                {/* Discount Display */}
                {formData.paymentMethod === 'easypaisa_jazzcash' && (
                  <div className="flex justify-between mb-2 text-sm text-green-600">
                    <span>Discount (15%):</span>
                    <span>- Rs. {discount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between font-bold text-base border-t pt-4 mt-4">
                  <span>Total:</span>
                  <span>Rs. {total.toFixed(2)}</span>
                </div>
                
                {formData.paymentMethod === 'cash_on_delivery' && (
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                    <p className="text-yellow-800 text-sm">
                      You will pay Rs. {total.toFixed(2)} when your order is delivered.
                    </p>
                  </div>
                )}
                
                {formData.paymentMethod === 'easypaisa_jazzcash' && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                    <p className="text-green-800 text-sm font-semibold">
                      You saved Rs. {discount.toFixed(2)} with Easypaisa/JazzCash payment!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
