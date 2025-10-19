import { motion } from "framer-motion";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";
import {
  FaUtensils,
  FaHospital,
  FaHome,
  FaBuilding,
  FaBirthdayCake,
} from "react-icons/fa";
import '../index.css'

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const OurServices = () => {
  const services = [
    {
      title: "Canteen Services",
      description:
        "Providing healthy and nutritious meals to canteens in offices, schools, and other institutions.",
      icon: <FaUtensils />,
    },
    {
      title: "Hospital Catering",
      description:
        "Supplying meals to hospitals and healthcare facilities, catering to the dietary needs of patients and staff.",
      icon: <FaHospital />,
    },
    {
      title: "Hostel & Student Accommodation",
      description:
        "Providing meal services to hostels, student accommodations, and other residential facilities.",
      icon: <FaHome />,
    },
    {
      title: "Corporate Catering",
      description:
        "Offering meal solutions to banks, offices, and corporate institutions for staff and clients.",
      icon: <FaBuilding />,
    },
    {
      title: "Party & Event Catering",
      description:
        "Customized meal services for parties, events, and family gatherings — fresh, flavorful, and festive.",
      icon: <FaBirthdayCake />,
    },
  ];

  const { theme } = useContext(ThemeContext);

  return (
    <section
      className={`py-20 relative ${
        theme === "light"
          ? "bg-gradient-to-br from-gray-50 to-gray-200 text-gray-900"
          : "bg-gradient-to-br from-gray-900 to-gray-800 text-white"
      } overflow-hidden`}
    >
      {/* Gradient background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,165,0,0.12),transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={staggerContainer}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-5xl font-extrabold bg-gradient-to-r from-orange-400 via-pink-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-sm mb-4"
          >
            Our Premium Services
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-gray-500 max-w-2xl mx-auto"
          >
            We provide high-quality catering and food provisioning services —
            crafted to meet every need, from institutions to private events.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={staggerContainer}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -8, scale: 1.03 }}
              className="relative overflow-hidden backdrop-blur-xl bg-white/10 border border-white/20 dark:bg-gray-800/30 dark:border-gray-700/40 rounded-3xl p-8 text-center shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-orange-400/50"
            >
              {/* ✨ Animated gradient shimmer layer */}
              <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0)_100%)] animate-shine pointer-events-none"></div>

              <div className="flex justify-center mb-5">
                <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 via-pink-500 to-yellow-400 text-white text-3xl shadow-lg">
                  {service.icon}
                </div>
              </div>
              <h2 className="text-2xl font-semibold mb-3">{service.title}</h2>
              <p className="text-gray-300 text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default OurServices;
