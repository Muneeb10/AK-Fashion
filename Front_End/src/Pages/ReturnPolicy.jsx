import React from 'react';

const ReturnPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Return & Exchange Policy</h1>
      <p className="text-gray-600 mb-8">
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">1. Return Eligibility</h2>
          <p className="text-gray-600 mb-4">
            We accept returns within <span className="font-medium">30 days</span> of purchase. To be eligible for a return:
          </p>
          <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
            <li>Item must be unused, unworn, and in its original condition</li>
            <li>Original tags and packaging must be intact</li>
            <li>Proof of purchase (order number or receipt) is required</li>
          </ul>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
            <p className="text-yellow-700">
              <span className="font-medium">Note:</span> Some items are final sale and not eligible for return, including clearance items, personalized products, and intimate apparel.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">2. How to Initiate a Return</h2>
          <ol className="list-decimal pl-6 text-gray-600 mb-4 space-y-3">
            <li>
              <span className="font-medium">Log in</span> to your account and visit the <a href="/my-orders" className="text-blue-600 hover:underline">Order History</a> page
            </li>
            <li>
              <span className="font-medium">Select</span> the item(s) you wish to return
            </li>
            <li>
              <span className="font-medium">Print</span> the prepaid return label (or request one if not provided)
            </li>
            <li>
              <span className="font-medium">Pack</span> items securely in original packaging
            </li>
            <li>
              <span className="font-medium">Ship</span> your return within 7 days of approval
            </li>
          </ol>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">3. Return Shipping</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium text-gray-800 mb-2">Prepaid Returns</h3>
              <p className="text-gray-600">
                Free returns are provided for defective or incorrect items. We'll email you a prepaid shipping label.
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-medium text-gray-800 mb-2">Customer-Paid Returns</h3>
              <p className="text-gray-600">
                For change-of-mind returns, you're responsible for return shipping costs. We recommend using a trackable service.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">4. Refund Process</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 text-green-500 mr-2 mt-0.5">✓</div>
              <div>
                <p className="text-gray-600">
                  <span className="font-medium">Timing:</span> Refunds are processed within 3-5 business days after we receive your return.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 text-green-500 mr-2 mt-0.5">✓</div>
              <div>
                <p className="text-gray-600">
                  <span className="font-medium">Method:</span> Refunds are issued to the original payment method. Credit card refunds may take 1-2 billing cycles to appear.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 text-green-500 mr-2 mt-0.5">✓</div>
              <div>
                <p className="text-gray-600">
                  <span className="font-medium">Deductions:</span> Original shipping fees are non-refundable. A 10% restocking fee may apply to opened electronics.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">5. Exchanges</h2>
          <p className="text-gray-600 mb-4">
            We offer exchanges for size or color variations, subject to availability. To request an exchange:
          </p>
          <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
            <li>Follow the standard return process</li>
            <li>Include a note specifying your desired replacement</li>
            <li>We'll ship the new item once we receive your return</li>
          </ul>
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
            <p className="text-blue-700">
              <span className="font-medium">Tip:</span> For faster exchanges, consider placing a new order and returning the original item separately.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">6. Damaged or Defective Items</h2>
          <p className="text-gray-600 mb-4">
            If you receive a damaged or defective item, please contact us within <span className="font-medium">7 days</span> of delivery. We'll arrange for a free return and expedite your replacement.
          </p>
          <p className="text-gray-600">
            Please include photos of the damage in your return request.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">7. Contact Us</h2>
          <p className="text-gray-600 mb-2">
            For return-related questions or assistance:
          </p>
          <p className="text-gray-600">
            Email: returns@yourstore.com<br />
            Phone: 0346-1709871<br />
          </p>
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600">
              <span className="font-medium">Return Address:</span><br />
              Inner Elegance Returns<br />
              New Shehbaz Building<br />
              Thandi Sadak<br />
              Hydradad
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ReturnPolicy;