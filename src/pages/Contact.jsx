const ContactPage = () => {
  return (
    <div className="w-full py-6">
      <div className="mx-auto max-w-lg rounded-2xl border border-borderColor bg-bgPrimary p-6 shadow-lg md:p-10">
        <h1 className="text-textPrimary mb-6 text-3xl font-bold">Contact Us</h1>
        <p className="text-textSecondary mb-4">
          If you have any questions or inquiries, feel free to reach out to us
          via email.
        </p>
        <a
          href="mailto:contact@example.com"
          className="text-lg text-green hover:underline"
        >
          dejesusmelnard@gmail.com
        </a>
      </div>
    </div>
  );
};

export default ContactPage;
