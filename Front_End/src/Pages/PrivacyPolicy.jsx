import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Privacy Policy</h1>
      <p className="text-gray-600 mb-6">
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <div className="bg-white rounded-lg shadow-md p-6">
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
          <p className="text-gray-600 mb-4">
            Welcome to Inner Elegance Store. We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase from us.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">2. Information We Collect</h2>
          <p className="text-gray-600 mb-4">
            We may collect the following types of information:
          </p>
          <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
            <li><strong>Personal Information:</strong> Name, email address, phone number, shipping/billing address, payment information.</li>
            <li><strong>Order Information:</strong> Products purchased, order history, preferences.</li>
            <li><strong>Technical Data:</strong> IP address, browser type, device information, cookies, and usage data.</li>
            <li><strong>Communication Data:</strong> Any correspondence with our customer service team.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">3. How We Use Your Information</h2>
          <p className="text-gray-600 mb-4">
            We use the collected information for various purposes:
          </p>
          <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
            <li>To process and fulfill your orders</li>
            <li>To communicate with you about your orders and account</li>
            <li>To improve our products, services, and website experience</li>
            <li>To prevent fraud and enhance security</li>
            <li>To comply with legal obligations</li>
            <li>For marketing purposes (with your consent)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">4. Sharing Your Information</h2>
          <p className="text-gray-600 mb-4">
            We may share your information with:
          </p>
          <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
            <li>Payment processors to complete transactions</li>
            <li>Shipping carriers to deliver your orders</li>
            <li>Service providers who assist with our business operations</li>
            <li>Legal authorities when required by law</li>
          </ul>
          <p className="text-gray-600">
            We do not sell your personal information to third parties.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">5. Cookies and Tracking Technologies</h2>
          <p className="text-gray-600 mb-4">
            Our website uses cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and understand where our visitors are coming from. You can control cookies through your browser settings.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">6. Data Security</h2>
          <p className="text-gray-600 mb-4">
            We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">7. Your Rights</h2>
          <p className="text-gray-600 mb-4">
            Depending on your location, you may have certain rights regarding your personal information:
          </p>
          <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
            <li>Access, correct, or delete your personal data</li>
            <li>Object to or restrict processing of your data</li>
            <li>Withdraw consent (where applicable)</li>
            <li>Lodge a complaint with a data protection authority</li>
          </ul>
          <p className="text-gray-600">
            To exercise these rights, please contact us using the information below.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">8. Children's Privacy</h2>
          <p className="text-gray-600 mb-4">
            Our website is not intended for children under 13. We do not knowingly collect personal information from children under 13.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">9. Changes to This Policy</h2>
          <p className="text-gray-600 mb-4">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">10. Contact Us</h2>
          <p className="text-gray-600">
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <p className="text-gray-600 mt-2">
            Email: privacy@yourstore.com<br />
            Address: New Shehbaz Building Thandi Sadak Hydrabad
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;