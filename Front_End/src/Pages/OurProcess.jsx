import React from 'react';
import { Link } from 'react-router-dom';

const OurProcess = () => {
  const steps = [
    {
      id: 1,
      title: "Browse Products",
      description: "Explore our collection with intuitive categories, filters, and search functionality.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-bounce text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      cta: "1"
    },
    {
      id: 2,
      title: "Add to Cart",
      description: "Select items, choose variants/quantities, and save them in your shopping cart.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-bounce text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      cta: "/cart"
    },
    {
      id: 3,
      title: "Secure Checkout",
      description: "Enter shipping details and payment information through our encrypted checkout.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-bounce text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      cta: "/checkout"
    },
    {
      id: 4,
      title: "Order Confirmation",
      description: "Receive instant confirmation with order details and tracking information.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-bounce text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      cta: "/account/orders"
    },
    {
      id: 5,
      title: "Fast Delivery",
      description: "Your order ships within 1-3 business days with multiple delivery options.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-bounce text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1" />
        </svg>
      ),
      cta: "/shipping"
    },
    {
      id: 6,
      title: "Customer Support",
      description: "24/7 support for any questions, returns, or exchanges.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 animate-bounce text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      cta: "/contact"
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gray-200 py-16 px-6 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-black">Our Shopping Journey</h1>
        <p className="mt-4 text-lg sm:text-xl text-black">Simple steps from browsing to delivery</p>
      </div>

      {/* Stepper Section */}
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <ul className="space-y-12">
          {steps.map((step, index) => (
            <li key={step.id} className="relative bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition duration-300">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="h-12 w-12 rounded-full bg-black flex items-center justify-center shadow-md">
                    {step.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                  <p className="mt-1 text-gray-600">{step.description}</p>
                </div>
                <div>
                   <h3 className="text-xl font-semibold text-gray-900">{step.id}</h3>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 py-16 px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">Ready to Begin?</h2>
        <p className="mt-4 text-lg sm:text-xl text-gray-600">Start your seamless shopping experience today</p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/products"
            className="inline-block px-8 py-4 text-white text-lg font-semibold bg-black hover:bg-gray-800 rounded-lg shadow transition"
          >
            Browse Products
          </Link>
          <Link
            to="/contact"
            className="inline-block px-8 py-4 text-black text-lg font-semibold bg-gray-200 hover:bg-black hover:text-white  rounded-lg transition"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OurProcess;
