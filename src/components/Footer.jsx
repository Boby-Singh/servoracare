
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-blue-950 text-white py-10 px-4 text-center">

      <h2 className="text-3xl font-bold mb-3">
        ServoraCare
      </h2>

      <p className="mb-6 text-gray-300">
        Trusted Home Service Platform
      </p>

      <div className="flex justify-center flex-wrap gap-6 mb-6 text-sm">
        <Link
          to="/privacy-policy"
          className="text-gray-300 hover:text-orange-400 transition-colors"
        >
          Privacy Policy
        </Link>

        <Link
          to="/contact"
          className="text-gray-300 hover:text-orange-400 transition-colors"
        >
          Contact Us
        </Link>

        <Link
          to="/about"
          className="text-gray-300 hover:text-orange-400 transition-colors"
        >
          About Us
        </Link>
      </div>

      <div className="border-t border-blue-800 pt-5">
        <p className="text-sm text-gray-400">
          © 2026 ServoraCare. All Rights Reserved.
        </p>

        <p className="text-xs text-gray-500 mt-2">
          Your Home, Our Care.
        </p>
      </div>

    </footer>
  );
}

export default Footer;
