import { motion } from "framer-motion";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const OurServices = () => {
  const services = [
    {
      title: "Canteen Services",
      description:
        "Providing healthy and nutritious meals to canteens in offices, schools, and other institutions.",
      icon: "🍴", // You can replace this with an actual icon or image
    },
    {
      title: "Hospital Catering",
      description:
        "Supplying meals to hospitals and healthcare facilities, catering to the dietary needs of patients and staff.",
      icon: "🏥", // You can replace this with an actual icon or image
    },
    {
      title: "Hostel and Student Accommodation",
      description:
        "Providing meal services to hostels, student accommodations, and other residential facilities.",
      icon: "🏠", // You can replace this with an actual icon or image
    },
    {
      title: "Corporate Catering",
      description:
        "Offering meal solutions to banks, offices, and other corporate institutions, catering to the needs of staff and clients.",
      icon: "🏢", // You can replace this with an actual icon or image
    },
    {
      title: "Party and Event Catering",
      description:
        "Providing customized meal services for parties, events, and other special occasions, including family gatherings and celebrations.",
      icon: "🎉", // You can replace this with an actual icon or image
    },
  ];
  const { theme, setTheme } = useContext(ThemeContext);


  return (
    <div className={`py-12 ${theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}`}> {/* Removed min-h-screen */}
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center mb-12"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-4xl font-bold  mb-4"
          >
            Food Provisioning Services
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-lg  max-w-2xl mx-auto"
          >
            We offer a range of food provisioning services to various institutions and organizations.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className={`shadow-lg  ${theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'} rounded-lg p-6 text-center hover:shadow-xl transition-shadow duration-300`}
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h2 className="text-xl font-semibold  mb-2">
                {service.title}
              </h2>
              <p className="">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default OurServices;