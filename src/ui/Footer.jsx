function Footer() {
  return (
    <footer className="block w-full bg-dark py-4 text-center text-white md:hidden">
      <div className="mx-auto w-full">
        <p className="text-sm">
          &copy; {new Date().getFullYear()}{' '}
          <a
            className="hover:text-yellow"
            href="https://melnerdz.com"
            target="_blank"
            rel="noreferrer"
          >
            melnerdz.com.
          </a>{' '}
          All rights reserved.
        </p>
        <nav className="mt-2 flex justify-center space-x-4">
          <a
            href="/terms-of-service"
            className="text-gray-400 transition hover:text-yellow"
          >
            Terms of Service
          </a>
          <a
            href="/privacy-policy"
            className="text-gray-400 transition hover:text-yellow"
          >
            Privacy Policy
          </a>
          <a
            href="/contact"
            className="text-gray-400 transition hover:text-yellow"
          >
            Contact Us
          </a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
