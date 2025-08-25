import React from 'react';

const ShippingPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Shipping & Delivery Policy</h1>
      <p className="text-gray-600 mb-8">
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">1. Shipping Destinations</h2>
          <p className="text-gray-600 mb-4">
            We currently ship to all 50 U.S. states. International shipping is available to select countries. During checkout, you'll be able to see if we ship to your location.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">2. Processing Time</h2>
          <p className="text-gray-600 mb-4">
            Orders are typically processed within <span className="font-medium">1-3 business days</span> (excluding weekends and holidays). During peak seasons or sales events, processing may take slightly longer.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">3. Shipping Methods & Delivery Times</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-2 px-4 border-b text-left">Shipping Method</th>
                  <th className="py-2 px-4 border-b text-left">Delivery Time</th>
                  <th className="py-2 px-4 border-b text-left">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b">Standard Shipping</td>
                  <td className="py-2 px-4 border-b">3-7 business days</td>
                  <td className="py-2 px-4 border-b">$5.99</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b">Expedited Shipping</td>
                  <td className="py-2 px-4 border-b">2-3 business days</td>
                  <td className="py-2 px-4 border-b">$12.99</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b">Overnight Shipping</td>
                  <td className="py-2 px-4 border-b">1 business day</td>
                  <td className="py-2 px-4 border-b">$24.99</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b">Free Shipping</td>
                  <td className="py-2 px-4 border-b">5-10 business days</td>
                  <td className="py-2 px-4 border-b">Free on orders over $50</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">4. Order Tracking</h2>
          <p className="text-gray-600 mb-4">
            Once your order ships, you'll receive a confirmation email with tracking information. You can track your package using the link provided or by visiting our <a href="/track-order" className="text-blue-600 hover:underline">Order Tracking</a> page.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">5. Shipping Restrictions</h2>
          <p className="text-gray-600 mb-4">
            Some items may have shipping restrictions due to size, weight, or content regulations. These include:
          </p>
          <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
            <li>Oversized items may require special shipping arrangements</li>
            <li>Certain products cannot be shipped internationally</li>
            <li>Some states have restrictions on specific product categories</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">6. Undeliverable Packages</h2>
          <p className="text-gray-600 mb-4">
            If a package is returned to us as undeliverable, we will contact you to arrange reshipment. Additional shipping fees may apply for reshipment.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">7. Delivery Issues</h2>
          <p className="text-gray-600 mb-4">
            If you experience any issues with your delivery, please contact us within <span className="font-medium">14 days</span> of the estimated delivery date. Common issues include:
          </p>
          <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
            <li>Package marked as delivered but not received</li>
            <li>Damaged package upon arrival</li>
            <li>Incorrect items received</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">8. Contact Us</h2>
          <p className="text-gray-600 mb-2">
            For any questions about our shipping policy, please contact our customer service team:
          </p>
          <p className="text-gray-600">
            Email: shipping@yourstore.com<br />
            Phone: 0346-1709871<br />
            Hours: Monday-Friday, 9am-5pm EST
          </p>
        </section>
      </div>
    </div>
  );
};

export default ShippingPolicy;