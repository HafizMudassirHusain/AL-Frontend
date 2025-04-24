import React, { useContext, useRef } from "react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import { ThemeContext } from "../context/ThemeContext";

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
      staggerChildren: 0.3,
    },
  },
};

const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    // Replace with your EmailJS credentials
    const serviceID = "service_5ru6wmm";
    const templateID = "template_ax35b4d";
    const userID = "Pv3yL9ioNcyiGiaxV";

  // Send email
  emailjs
    .sendForm(serviceID, templateID, form.current, userID)
    .then(
      (result) => {
        alert("Message sent successfully!");
        console.log(result.text);
      },
      (error) => {
        alert("Failed to send the message. Please try again.");
        console.log(error.text);
      }
    );

  // Reset the form
  e.target.reset();
  };
    const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'} py-12`}>
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
            className="text-4xl font-bold mb-4"
          >
            Contact Us
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-lg max-w-2xl mx-auto"
          >
            We'd love to hear from you! Whether you have a question, feedback, or just want to say hello, feel free to reach out to us.
          </motion.p>
        </motion.div>

        {/* Contact Information Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className={`${theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'} shadow-lg rounded-lg p-8 mb-12`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Address */}
            <motion.div variants={fadeInUp} className="text-center">
              <FaMapMarkerAlt className="text-4xl text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Address</h3>
              <p >
                House #12, Ground Floor, Gulistan-e-Johar, Karachi
              </p>
            </motion.div>

            {/* Phone */}
            <motion.div variants={fadeInUp} className="text-center">
              <FaPhone className="text-4xl text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold  mb-2">Phone</h3>
              <p>03XX-XXXXXXX</p>
            </motion.div>

            {/* Email */}
            <motion.div variants={fadeInUp} className="text-center">
              <FaEnvelope className="text-4xl text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold  mb-2">Email</h3>
              <p>info@mzkitchen.com</p>
            </motion.div>

            {/* Opening Hours */}
            <motion.div variants={fadeInUp} className="text-center">
              <FaClock className="text-4xl text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Opening Hours</h3>
              <p>10:00 AM - 10:00 PM</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Contact Form and Map Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Contact Form */}
          <motion.div
            variants={fadeInUp}
            className={`${theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'} shadow-lg rounded-lg p-8`}
          >
            <h2 className="text-3xl font-bold  mb-6">Send Us a Message</h2>
            <form ref={form} onSubmit={sendEmail} className="space-y-6">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <label htmlFor="name" className="block  font-semibold mb-2">
        Name
      </label>
      <input
        type="text"
        id="name"
        name="name"   // Must match {{from_name}} in the template
        placeholder="Your Name"
        className={`${theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'}
        w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500`}
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
        name="email"   // Must match {{from_email}} in the template
        placeholder="Your Email"
        className={`${theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'}
        w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500`}
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
      name="subject" // Must match {{subject}} in the template
      placeholder="Subject"
      className={`${theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'}
      w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500`}
      required
    />
  </div>
  <div>
    <label htmlFor="message" className="block font-semibold mb-2">
      Message
    </label>
    <textarea
      id="message"
      name="message" // Must match {{message}} in the template
      rows="5"
      placeholder="Your Message"
      className={`${theme === 'light' ? 'bg-white text-black' : ' text-white'}
      w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500`}
      required
    ></textarea>
  </div>
  <div>
    <button
      type="submit"
      className="w-full bg-orange-500 px-6 py-3 rounded-lg hover:bg-orange-600 transition duration-300"
    >
      Send Message
    </button>
  </div>
</form>
          </motion.div>

          {/* Google Map */}
          <motion.div
            variants={fadeInUp}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <iframe
              title="MZ Kitchen Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14471.720169390805!2d67.07631998841194!3d24.93445302185871!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb3391e9928352f%3A0x3a74fdfcceb32961!2sMZ%20foods!5e0!3m2!1sen!2s!4v1740426030371!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactUs;

