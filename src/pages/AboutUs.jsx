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

  return (
    <div className={`min-h-screen surface ${theme === "light" ? "light" : ""} transition-colors duration-500`}>
      {/* Hero Section */}
      <section className="relative overflow-hidden lux-section-alt">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="container mx-auto px-6 py-24 text-center relative z-10"
        >
          <motion.p variants={fadeInUp} className="lux-script text-2xl mb-3">
            Since 2016
          </motion.p>
          <motion.h1
            variants={fadeInUp}
            className="font-display text-5xl font-semibold capitalize mb-4"
          >
            About <span className="text-gold">MZ Kitchen</span>
          </motion.h1>
          <motion.div variants={fadeInUp} className="lux-divider" />
          <motion.p
            variants={fadeInUp}
            className="text-base max-w-2xl mx-auto leading-relaxed text-muted-warm"
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
            <p className="lux-script text-2xl mb-2">Our Journey</p>
            <h2 className="font-display text-4xl font-semibold capitalize text-gold mb-6">Our Story</h2>
            <p className="mb-4 leading-relaxed text-muted-warm">
              Al-Rehman Kitchen began with a simple goal — to bring people together through food.
              What started in Gulshan Iqbal has turned into a trusted name known for
              excellence, hygiene, and delicious flavors.
            </p>
            <p className="mb-4 leading-relaxed text-muted-warm">
              Every dish we create reflects our love for traditional recipes, modern taste, and
              commitment to quality. We work with local suppliers and ensure that freshness is
              never compromised.
            </p>
            <p className="leading-relaxed text-muted-warm">
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
              className="border border-[#D9A44D]/30 p-2 shadow-xl w-full max-w-md"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Mission & Vision */}
      <section className="relative lux-section-alt py-20 border-y border-[#D9A44D]/15">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-10"
          >
            <motion.div variants={fadeInUp}>
              <h3 className="font-display text-3xl font-semibold capitalize text-gold mb-4">Our Mission</h3>
              <p className="leading-relaxed text-muted-warm">
                To inspire food lovers with authentic taste, creativity, and freshness — crafting
                meals that nourish body and soul.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <h3 className="font-display text-3xl font-semibold capitalize text-gold mb-4">Our Vision</h3>
              <p className="leading-relaxed text-muted-warm">
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
          className="font-display text-4xl font-semibold capitalize text-center mb-12"
        >
          Why Choose <span className="text-gold">Us?</span>
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
              className="p-8 text-center lux-card hover:border-[#D9A44D]/60 hover:shadow-[0_0_25px_rgba(217,164,77,0.15)] transition-all duration-300"
            >
              <item.icon className="text-4xl text-gold mx-auto mb-4" />
              <h3 className="font-display text-xl font-semibold uppercase tracking-[0.08em] mb-2">{item.title}</h3>
              <p className="text-muted-warm text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Team Section */}
      <section className="lux-section-alt py-20 border-t border-[#D9A44D]/15">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-4xl font-semibold capitalize mb-12"
          >
            Meet Our <span className="text-gold">Team</span>
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
                className="p-6 lux-card shadow-md"
              >
                <member.icon className="text-4xl text-gold mx-auto mb-4" />
                <h4 className="font-display text-xl font-semibold uppercase tracking-[0.08em]">{member.name}</h4>
                <p className="text-muted-warm text-sm mt-1">{member.role}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer Divider */}
      <div className="h-px brand-gradient"></div>
    </div>
  );
};

export default AboutUs;
