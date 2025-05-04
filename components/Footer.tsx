import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-50 mt-16">
      <div className="container mx-auto px-4 md:px-24 py-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">
        {/* Left Section */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p>
            © {new Date().getFullYear()} <span className="font-semibold text-teal-600">OtaSphere</span>. All rights reserved.
          </p>
        </div>

        {/* Center Navigation Links */}
        <div className="flex flex-wrap gap-4 justify-center text-gray-500">
          <a href="#" className="hover:text-teal-600 transition">Privacy Policy</a>
          <a href="#" className="hover:text-teal-600 transition">Terms of Service</a>
          <a href="#" className="hover:text-teal-600 transition">Support</a>
        </div>

        {/* Right Social Icons */}
        <div className="flex gap-4 mt-4 md:mt-0 justify-center md:justify-end">
          <a href="#" aria-label="Facebook" className="text-gray-500 hover:text-teal-600 transition">
            <FaFacebookF size={16} />
          </a>
          <a href="#" aria-label="LinkedIn" className="text-gray-500 hover:text-teal-600 transition">
            <FaLinkedinIn size={16} />
          </a>
          <a href="#" aria-label="Twitter" className="text-gray-500 hover:text-teal-600 transition">
            <FaTwitter size={16} />
          </a>
        </div>
      </div>  
    </footer>
  );
};

export default Footer;
