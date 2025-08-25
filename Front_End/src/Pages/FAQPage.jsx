import React, { useState } from 'react';

const FAQPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I place an order?",
      answer: "To place an order, simply browse our products, add items to your cart, and proceed to checkout. You'll need to provide shipping information and payment details to complete your purchase."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, and Google Pay. All payments are processed securely through our encrypted payment gateway."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a confirmation email with tracking information. You can also track your order by logging into your account and visiting the 'Order History' section."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for most items. Items must be unused, in original condition, and with all tags attached. Please visit our Returns page for complete details and instructions."
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping typically takes 3-7 business days within the continental US. We also offer expedited (2-3 business days) and overnight options. Delivery times may vary during peak seasons."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship to select countries worldwide. International shipping costs and delivery times vary by destination. You'll see available options and costs during checkout."
    },
    {
      question: "How do I contact customer service?",
      answer: "Our customer service team is available via email at support@yourstore.com, phone at (555) 123-4567, or through live chat on our website during business hours (Monday-Friday, 9am-6pm EST)."
    },
    {
      question: "Can I modify or cancel my order after placing it?",
      answer: "We process orders quickly, but if you need to modify or cancel your order, please contact us immediately. If your order hasn't shipped yet, we may be able to accommodate your request."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
        <p className="text-xl text-gray-600">
          Find answers to common questions about shopping with us
        </p>
      </div>

      {/* Search Bar */}
     

      {/* FAQ Categories */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {['Ordering', 'Shipping', 'Returns', 'Payments', 'Account', 'Products'].map((category) => (
          <button
            key={category}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-black hover:text-white transition-colors"
          >
            {category}
          </button>
        ))}
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              className="w-full flex justify-between items-center p-5 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
              <svg
                className={`w-5 h-5 text-gray-500 transform transition-transform ${activeIndex === index ? 'rotate-180' : ''}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div
              className={`px-5 pb-5 ${activeIndex === index ? 'block' : 'hidden'}`}
            >
              <p className="text-gray-600">{faq.answer}</p>
              {index === 3 && (
                <a
                  href="/return-policy"
                  className="mt-3 inline-block text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  View full return policy →
                </a>
              )}
              {index === 4 && (
                <a
                  href="/shipping-policy"
                  className="mt-3 inline-block text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  View shipping details →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Still Have Questions Section */}
      <div className="mt-16 bg-indigo-50 rounded-xl p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">Still have questions?</h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Our customer support team is happy to help with any other questions you might have.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="/contact"
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Contact Us
          </a>
          <a
            href={`https://wa.me/923310248013`} // Replace with your number
            target="_blank"
            className="px-6 py-3 border border-gray-300 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Call Now
          </a>
          <a
            href="mailto:support@yourstore.com"
            className="px-6 py-3 border border-gray-300 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Email Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;