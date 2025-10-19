import { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeContext } from "../context/ThemeContext";
import testnomialuser1 from "../assets/testnomialuser1.png";
import testnomialuser2 from "../assets/testnomialuser2.png";
import testnomialuser3 from "../assets/testnomialuser3.png";
import bgImage from "../assets/bg-image.jpg"; // Add your bg image here

const Testimonials = () => {
  const testimonials = [
    {
      name: "Ali Khan",
      review: "The best biryani in Karachi! Highly recommended.",
      image: testnomialuser1,
      rating: 5,
    },
    {
      name: "Fatima Ahmed",
      review: "Amazing food and great service. Will order again!",
      image: testnomialuser2,
      rating: 4,
    },
    {
      name: "Usman Malik",
      review: "The chicken karahi is to die for. Delicious!",
      image: testnomialuser3,
      rating: 5,
    },
  ];

  const { theme } = useContext(ThemeContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Auto-slide every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 5));
    }, 300);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      setProgress(0);
    }
  }, [progress, testimonials.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setProgress(0);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
    setProgress(0);
  };

  const renderStars = (rating) =>
    [...Array(5)].map((_, i) => (
      <motion.span
        key={i}
        initial={{ scale: 0 }}
        animate={{ scale: i < rating ? 1 : 0.9 }}
        transition={{ duration: 0.3, delay: i * 0.1 }}
        className={`text-2xl ${
          i < rating ? "text-yellow-400" : "text-gray-400"
        }`}
      >
        ★
      </motion.span>
    ));

  return (
    <section className="relative overflow-hidden py-28">
      {/* Animated Background Layer */}
      <motion.div
        className="absolute inset-0 bg-fixed bg-center bg-cover"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      />


      {/* Floating gradient glows */}
      <motion.div
        className="absolute top-10 left-[-120px] w-96 h-96 bg-orange-500/20 blur-[120px]"
        animate={{
          y: [0, 40, 0],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      ></motion.div>
      <motion.div
        className="absolute bottom-10 right-[-120px] w-96 h-96 bg-yellow-400/20 blur-[120px]"
        animate={{
          y: [0, -40, 0],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      ></motion.div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-center mb-14 text-orange-500 drop-shadow-[0_2px_10px_rgba(255,165,0,0.4)]"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          What Our Customers Say 🍽️
        </motion.h2>

        <div className="relative flex items-center justify-center">
          {/* Prev Button */}
          <button
            onClick={handlePrevious}
            className="absolute left-0 z-10 p-3 bg-white/80 backdrop-blur-lg text-orange-600 rounded-full shadow-lg hover:scale-110 transition duration-300"
          >
            ◀
          </button>

          {/* Testimonial Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className={`relative max-w-lg w-full mx-auto text-center px-8 py-12 rounded-3xl shadow-2xl border border-white/10 transition-transform duration-500 hover:shadow-orange-500/20 ${
                theme === "light"
                  ? "bg-white/80 backdrop-blur-xl"
                  : "bg-gray-900/70 backdrop-blur-xl"
              }`}
              initial={{ opacity: 0, rotateY: -30, scale: 0.9 }}
              animate={{ opacity: 1, rotateY: 0, scale: 1 }}
              exit={{ opacity: 0, rotateY: 30, scale: 0.9 }}
              transition={{ duration: 0.8, type: "spring" }}
              whileHover={{
                rotateX: [0, 5, 0],
                rotateY: [0, -5, 0],
                transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              <motion.img
                src={testimonials[currentIndex].image}
                alt={testimonials[currentIndex].name}
                className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-orange-500 shadow-lg hover:scale-110 transition duration-500"
                whileHover={{ rotate: [0, 10, -10, 0] }}
              />
              <h3 className="text-2xl font-semibold mb-2">
                {testimonials[currentIndex].name}
              </h3>
              <div className="flex justify-center mb-4">
                {renderStars(testimonials[currentIndex].rating)}
              </div>
              <motion.p
                className={`italic text-lg max-w-md mx-auto ${
                  theme === "light" ? "text-gray-700" : "text-gray-300"
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                “{testimonials[currentIndex].review}”
              </motion.p>

              {/* Progress Bar */}
              <div className="w-full bg-gray-300/40 rounded-full h-2 mt-8 overflow-hidden">
                <motion.div
                  className="bg-gradient-to-r from-orange-500 to-yellow-400 h-2 rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                ></motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="absolute right-0 z-10 p-3 bg-white/80 backdrop-blur-lg text-orange-600 rounded-full shadow-lg hover:scale-110 transition duration-300"
          >
            ▶
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
