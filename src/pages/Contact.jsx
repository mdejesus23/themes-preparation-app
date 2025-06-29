const ContactPage = () => {
  return (
    <div className="bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-lg">
        <h1 className="text-gray-800 mb-6 text-3xl font-bold">Contact Us</h1>
        <p className="text-gray-600 mb-4">
          If you have any questions or inquiries, feel free to reach out to us
          via email.
        </p>
        <a
          href="mailto:contact@example.com"
          className="text-lg text-blue-500 hover:underline"
        >
          dejesusmelnard@gmail.com
        </a>
      </div>
    </div>
  );
};

export default ContactPage;
