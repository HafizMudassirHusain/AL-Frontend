import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhone,
  FaClock,
} from "react-icons/fa";
import logo from "../assets/logo.jpeg";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-[#1f1f1f] via-[#2a2a2a] to-[#141414] text-gray-300 py-16 overflow-hidden">
      {/* Gradient Overlay for Soft Glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#FF5E62]/10 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Logo and Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="MZ Kitchen Logo"
                className="w-16 h-16 rounded-2xl shadow-md border border-[#FF9966]/20"
              />
              <h2 className="text-2xl font-bold bg-gradient-to-r from-[#FF5E62] to-[#FFD43B] bg-clip-text text-transparent">
                MZ Kitchen
              </h2>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Serving delicious food since 2016 — your flavor haven in Karachi 🍴
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: "Home", link: "/" },
                { name: "Menu", link: "/menu" },
                { name: "About Us", link: "/about" },
                { name: "Contact Us", link: "/contact" },
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href={item.link}
                    className="text-gray-400 hover:text-transparent bg-gradient-to-r from-[#FF5E62] to-[#FFD43B] bg-clip-text transition-all duration-300"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">
              Contact Info
            </h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center gap-2 hover:text-[#FF9966] transition">
                <FaMapMarkerAlt className="text-[#FF5E62]" />
                House #12, Ground Floor, Gulistan-e-Johar, Karachi
              </li>
              <li className="flex items-center gap-2 hover:text-[#FFD43B] transition">
                <FaPhone className="text-[#FF9966]" />
                03XX-XXXXXXX
              </li>
              <li className="flex items-center gap-2 hover:text-[#FF9966] transition">
                <FaClock className="text-[#FF5E62]" />
                10:00 AM - 10:00 PM
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Follow Us</h3>
            <div className="flex space-x-5">
              {[
                { icon: <FaFacebook />, link: "https://facebook.com" },
                { icon: <FaTwitter />, link: "https://twitter.com" },
                { icon: <FaInstagram />, link: "https://instagram.com" },
                { icon: <FaLinkedin />, link: "https://linkedin.com" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  className="p-3 bg-gradient-to-r from-[#FF5E62] to-[#FFD43B] rounded-full text-white hover:scale-110 transition-transform shadow-md hover:shadow-[0_0_15px_rgba(255,107,0,0.5)]"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()}{" "}
          <span className="bg-gradient-to-r from-[#FF5E62] to-[#FFD43B] bg-clip-text text-transparent font-semibold">
            MZ Kitchen
          </span>
          . All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
