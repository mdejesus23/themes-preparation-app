import { NavLink } from 'react-router-dom';
function Footer() {
  return (
    <footer className="absolute bottom-0 w-full py-4 text-center text-neutral-500">
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
          <NavLink
            to="/terms-of-service"
            className="text-gray-400 transition hover:text-yellow"
          >
            Terms of Service
          </NavLink>
          <NavLink
            to="/privacy-policy"
            className="text-gray-400 transition hover:text-yellow"
          >
            Privacy Policy
          </NavLink>
          <NavLink
            to="/contact"
            className="text-gray-400 transition hover:text-yellow"
          >
            Contact Us
          </NavLink>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
