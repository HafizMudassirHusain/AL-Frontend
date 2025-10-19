import { useContext } from "react";
import { FaUtensils, FaAward, FaUsers, FaSmile, FaLeaf } from "react-icons/fa";
import { motion } from "framer-motion";
import { ThemeContext } from "../context/ThemeContext";
import logo from "../assets/logo.png";

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

const AboutUs = () => {
  const { theme } = useContext(ThemeContext);

  const bg = theme === "light" ? "bg-white text-gray-900" : "bg-gray-900 text-gray-100";
  const accent = theme === "light" ? "text-orange-500" : "text-orange-400";

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
            className="text-5xl font-extrabold mb-6 tracking-tight"
          >
            About <span className="text-orange-500">Al-Rehman Kitchen</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-lg max-w-2xl mx-auto leading-relaxed text-gray-600 dark:text-gray-300"
          >
            Since 2016, Al-Rehman Kitchen has been serving authentic, high-quality food made
            with love and passion — now reaching 17+ branches across Karachi.
          </motion.p>
        </motion.div>
      </section>

      {/* Our Story */}
      <section className="container mx-auto px-6 py-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-10 items-center"
        >
          <motion.div variants={fadeInUp}>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
              Al-Rehman Kitchen began with a simple goal — to bring people together through food.
              What started in Gulshan Iqbal has turned into a trusted name known for
              excellence, hygiene, and delicious flavors.
            </p>
            <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
              Every dish we create reflects our love for traditional recipes, modern taste, and
              commitment to quality. We work with local suppliers and ensure that freshness is
              never compromised.
            </p>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              From small beginnings to a beloved brand, our story continues with every satisfied
              smile we serve.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex justify-center">
            <motion.img
              src={logo}
              alt="Al-Rehman Kitchen"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="rounded-2xl shadow-xl w-full max-w-md"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Mission & Vision */}
      <section className="relative bg-gradient-to-r from-orange-500 to-yellow-500 py-16 text-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-10"
          >
            <motion.div variants={fadeInUp}>
              <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
              <p className="leading-relaxed">
                To inspire food lovers with authentic taste, creativity, and freshness — crafting
                meals that nourish body and soul.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <h3 className="text-3xl font-bold mb-4">Our Vision</h3>
              <p className="leading-relaxed">
                To be the go-to name in Pakistan’s culinary world, blending tradition and
                innovation to bring unforgettable dining experiences.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container mx-auto px-6 py-20">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center mb-12"
        >
          Why Choose <span className="text-orange-500">Us?</span>
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {[
            { icon: FaUtensils, title: "Fresh Ingredients", desc: "We source only the best produce and spices." },
            { icon: FaAward, title: "Award-Winning Taste", desc: "Our recipes are recognized for authentic flavor." },
            { icon: FaUsers, title: "Expert Chefs", desc: "Our chefs craft every dish with precision and love." },
            { icon: FaSmile, title: "Happy Customers", desc: "Your satisfaction drives our passion to serve better." },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              className={`p-8 text-center rounded-2xl shadow-md hover:shadow-lg border transition-all duration-300 ${
                theme === "light" ? "bg-white border-gray-200" : "bg-gray-800 border-gray-700"
              }`}
            >
              <item.icon className="text-5xl text-orange-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-100 dark:bg-gray-800 py-16">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold mb-12"
          >
            Meet Our <span className="text-orange-500">Team</span>
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10"
          >
            {[
              { name: "Chef Imran", role: "Head Chef", icon: FaUtensils },
              { name: "Ayesha Khan", role: "Operations Manager", icon: FaLeaf },
              { name: "Ali Raza", role: "Marketing Lead", icon: FaSmile },
            ].map((member, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                className={`p-6 rounded-2xl shadow-md ${
                  theme === "light" ? "bg-white" : "bg-gray-700"
                }`}
              >
                <member.icon className="text-5xl text-orange-500 mx-auto mb-4" />
                <h4 className="text-xl font-semibold">{member.name}</h4>
                <p className="text-gray-500 dark:text-gray-300">{member.role}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer Divider */}
      <div className="h-2 bg-gradient-to-r from-orange-500 to-yellow-500"></div>
    </div>
  );
};

export default AboutUs;
