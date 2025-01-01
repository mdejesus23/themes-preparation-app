import React from 'react';

const TermsOfService = () => {
  return (
    <div className="bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-md">
        <h1 className="text-gray-800 mb-6 text-3xl font-bold">
          Terms of Service
        </h1>

        <p className="text-gray-600 mb-4">
          Welcome to our website! By using our services, you agree to the
          following terms and conditions. Please read them carefully.
        </p>

        <h2 className="text-gray-700 mb-3 mt-6 text-2xl font-semibold">
          1. Acceptance of Terms
        </h2>
        <p className="text-gray-600 mb-4">
          By accessing and using our services, you agree to be bound by these
          Terms of Service and all applicable laws and regulations.
        </p>

        <h2 className="text-gray-700 mb-3 mt-6 text-2xl font-semibold">
          2. Use of Our Services
        </h2>
        <p className="text-gray-600 mb-4">
          You agree to use our services only for lawful purposes and in
          compliance with all applicable laws. You may not use our services to
          engage in any fraudulent or harmful activity.
        </p>

        <h2 className="text-gray-700 mb-3 mt-6 text-2xl font-semibold">
          3. Intellectual Property
        </h2>
        <p className="text-gray-600 mb-4">
          All content, trademarks, and logos on our website are the property of
          their respective owners. You may not use, reproduce, or distribute any
          content without prior written permission.
        </p>

        <h2 className="text-gray-700 mb-3 mt-6 text-2xl font-semibold">
          4. Termination
        </h2>
        <p className="text-gray-600 mb-4">
          We reserve the right to terminate or suspend your access to our
          services at our discretion, without notice, for conduct that we
          believe violates these Terms of Service or is harmful to others.
        </p>

        <h2 className="text-gray-700 mb-3 mt-6 text-2xl font-semibold">
          5. Changes to Terms
        </h2>
        <p className="text-gray-600 mb-4">
          We may update these Terms of Service from time to time. Continued use
          of our services after any changes constitute your acceptance of the
          new terms.
        </p>

        <h2 className="text-gray-700 mb-3 mt-6 text-2xl font-semibold">
          6. Contact Us
        </h2>
        <p className="text-gray-600 mb-4">
          If you have any questions or concerns about these Terms of Service,
          please contact us at{' '}
          <a
            href="mailto:support@example.com"
            className="text-blue-500 hover:underline"
          >
            support@example.com
          </a>
          .
        </p>

        <p className="text-gray-500 mt-6 text-sm">
          Last updated: [Insert Date]
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;
