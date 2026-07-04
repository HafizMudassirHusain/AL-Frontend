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
    <footer className="relative bg-[#121009] text-[#A49B8A] pt-16 pb-8 overflow-hidden border-t border-[#D9A44D]/20">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Logo and Info */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="w-14 h-14 rounded-full border border-[#D9A44D] p-[2px] inline-flex">
                <img
                  src={logo}
                  alt="MZ Kitchen Logo"
                  className="w-full h-full rounded-full object-cover"
                />
              </span>
              <h2 className="font-display text-xl tracking-[0.12em] uppercase text-[#ECE3D0]">
                MZ <span className="text-[#D9A44D]">Kitchen</span>
              </h2>
            </div>
            <p className="leading-relaxed text-sm">
              Serving delicious food since 2016 — your flavor haven in Karachi.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-lg uppercase tracking-[0.14em] mb-5 text-[#D9A44D]">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Home", link: "/" },
                { name: "Menu", link: "/menu" },
                { name: "About Us", link: "/about" },
                { name: "Contact Us", link: "/contact" },
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href={item.link}
                    className="text-sm uppercase tracking-[0.1em] hover:text-[#D9A44D] transition-colors duration-300"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display text-lg uppercase tracking-[0.14em] mb-5 text-[#D9A44D]">
              Contact Info
            </h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 hover:text-[#ECE3D0] transition">
                <FaMapMarkerAlt className="text-[#D9A44D] mt-1 shrink-0" />
                House #12, Ground Floor, Gulistan-e-Johar, Karachi
              </li>
              <li className="flex items-center gap-3 hover:text-[#ECE3D0] transition">
                <FaPhone className="text-[#D9A44D] shrink-0" />
                03XX-XXXXXXX
              </li>
              <li className="flex items-center gap-3 hover:text-[#ECE3D0] transition">
                <FaClock className="text-[#D9A44D] shrink-0" />
                10:00 AM - 10:00 PM
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-display text-lg uppercase tracking-[0.14em] mb-5 text-[#D9A44D]">
              Follow Us
            </h3>
            <div className="flex space-x-4">
              {[
                { icon: <FaFacebook />, link: "https://facebook.com", label: "Facebook" },
                { icon: <FaTwitter />, link: "https://twitter.com", label: "Twitter" },
                { icon: <FaInstagram />, link: "https://instagram.com", label: "Instagram" },
                { icon: <FaLinkedin />, link: "https://linkedin.com", label: "LinkedIn" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  aria-label={social.label}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-[#D9A44D]/60 text-[#D9A44D] hover:bg-[#D9A44D] hover:text-[#1c1812] transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#D9A44D]/15 mt-12 pt-8 text-center text-sm">
          © {new Date().getFullYear()}{" "}
          <span className="text-[#D9A44D] font-display uppercase tracking-[0.1em]">
            MZ Kitchen
          </span>
          . All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
