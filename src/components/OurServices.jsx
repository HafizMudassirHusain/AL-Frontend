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
      className={`py-24 relative lux-section overflow-hidden ${
        theme === "light" ? "light" : ""
      }`}
    >
      <div className="container mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={staggerContainer}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <motion.p variants={fadeInUp} className="lux-script text-2xl mb-2">
            What We Offer
          </motion.p>
          <motion.h1
            variants={fadeInUp}
            className="font-display text-4xl md:text-5xl font-semibold capitalize text-gold"
          >
            Our Premium Services
          </motion.h1>
          <motion.div variants={fadeInUp} className="lux-divider" />
          <motion.p
            variants={fadeInUp}
            className="text-base text-muted-warm max-w-2xl mx-auto"
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
              whileHover={{ y: -8 }}
              className="relative overflow-hidden lux-card p-8 text-center transition-all duration-300 hover:border-[#D9A44D]/60 hover:shadow-[0_0_30px_rgba(217,164,77,0.15)]"
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 flex items-center justify-center border border-[#D9A44D]/70 text-gold text-2xl">
                  {service.icon}
                </div>
              </div>
              <h2 className="font-display text-xl uppercase tracking-[0.1em] text-[#ECE3D0] mb-3">
                {service.title}
              </h2>
              <p className="text-muted-warm text-sm leading-relaxed">
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
