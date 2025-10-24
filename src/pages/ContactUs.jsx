import { useContext, useRef } from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import { ThemeContext } from "../context/ThemeContext";

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const ContactUs = () => {
  const form = useRef();
  const { theme } = useContext(ThemeContext);

  const sendEmail = (e) => {
    e.preventDefault();

    const serviceID = "service_5ru6wmm";
    const templateID = "template_ax35b4d";
    const userID = "Pv3yL9ioNcyiGiaxV";

    emailjs.sendForm(serviceID, templateID, form.current, userID).then(
      () => {
        alert("✅ Message sent successfully!");
        e.target.reset();
      },
      () => alert("❌ Failed to send message. Please try again later.")
    );
  };

  const bg = theme === "light" ? "bg-white text-gray-900" : "bg-gray-900 text-gray-100";

  return (
    <div className={`min-h-screen ${bg} transition-colors duration-500`}>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 opacity-20" />
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="container mx-auto px-6 py-24 text-center relative z-10"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-5xl font-extrabold mb-4 tracking-tight"
          >
            Get in <span className="text-orange-500">Touch</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-lg max-w-2xl mx-auto text-gray-600 dark:text-gray-300"
          >
            Have questions, feedback, or collaboration ideas? We’d love to hear
            from you — just reach out below.
          </motion.p>
        </motion.div>
      </section>

      {/* Contact Info Cards */}
      <section className="container mx-auto px-6 py-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {[
            {
              icon: <FaMapMarkerAlt />,
              title: "Address",
              desc: "House #12, Ground Floor, Gulistan-e-Johar, Karachi",
            },
            { icon: <FaPhone />, title: "Phone", desc: "03XX-XXXXXXX" },
            { icon: <FaEnvelope />, title: "Email", desc: "info@mzkitchen.com" },
            { icon: <FaClock />, title: "Opening Hours", desc: "10:00 AM - 10:00 PM" },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              className={`p-8 text-center rounded-2xl shadow-md border transition-all duration-300 ${
                theme === "light"
                  ? "bg-white border-gray-200"
                  : "bg-gray-800 border-gray-700"
              }`}
            >
              <div className="text-5xl text-orange-500 mx-auto mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Contact Form & Map */}
      <section className="container mx-auto px-6 pb-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10"
        >
          {/* Contact Form */}
          <motion.div
            variants={fadeInUp}
            className={`rounded-2xl shadow-md p-8 ${
              theme === "light" ? "bg-white" : "bg-gray-800"
            }`}
          >
            <h2 className="text-3xl font-bold mb-6">
              Send Us a <span className="text-orange-500">Message</span>
            </h2>
            <form ref={form} onSubmit={sendEmail} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block font-semibold mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your Name"
                    className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-orange-500 ${
                      theme === "light"
                        ? "bg-white border-gray-300 text-gray-900"
                        : "bg-gray-700 border-gray-600 text-gray-100"
                    }`}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block font-semibold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Your Email"
                    className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-orange-500 ${
                      theme === "light"
                        ? "bg-white border-gray-300 text-gray-900"
                        : "bg-gray-700 border-gray-600 text-gray-100"
                    }`}
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block font-semibold mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Subject"
                  className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-orange-500 ${
                    theme === "light"
                      ? "bg-white border-gray-300 text-gray-900"
                      : "bg-gray-700 border-gray-600 text-gray-100"
                  }`}
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block font-semibold mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Your Message"
                  className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-orange-500 ${
                    theme === "light"
                      ? "bg-white border-gray-300 text-gray-900"
                      : "bg-gray-700 border-gray-600 text-gray-100"
                  }`}
                  required
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold py-3 rounded-lg shadow-lg hover:opacity-90 transition duration-300"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>

          {/* Map */}
          <motion.div
            variants={fadeInUp}
            className="rounded-2xl overflow-hidden shadow-md"
          >
            <iframe
              title="MZ Kitchen Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14471.720169390805!2d67.07631998841194!3d24.93445302185871!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb3391e9928352f%3A0x3a74fdfcceb32961!2sMZ%20foods!5e0!3m2!1sen!2s!4v1740426030371!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "480px" }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer Divider */}
      <div className="h-2 bg-gradient-to-r from-orange-500 to-yellow-500"></div>
    </div>
  );
};

export default ContactUs;
