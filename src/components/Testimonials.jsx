import { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeContext } from "../context/ThemeContext";
import testnomialuser1 from "../assets/testnomialuser1.png";
import testnomialuser2 from "../assets/testnomialuser2.png";
import testnomialuser3 from "../assets/testnomialuser3.png";
// import bgImage from "../assets/bg-image.jpg"; // 📸 Add your parallax image here

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
    {
      name: "Sara Khan",
      review: "The desserts are heavenly. Love the Gajjar ka Halwa!",
      image: testnomialuser1,
      rating: 4,
    },
    {
      name: "Zainab Ali",
      review: "The Singaporean Rice is a must-try. Perfectly cooked!",
      image: testnomialuser2,
      rating: 4.5,
    },
    {
      name: "Ahmed Raza",
      review: "Great variety of dishes and consistent quality.",
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
      {/* Parallax Background */}
      {/* <div
        className="absolute inset-0 bg-fixed bg-center bg-cover"
        style={{
          backgroundImage: `url(${bgImage})`,
          transform: "translateZ(0)",
        }}
      ></div> */}

      {/* Overlay */}
      <div
        className={`absolute inset-0 ${
          theme === "light"
            ? "bg-white/60 backdrop-blur-sm"
            : "bg-black/70 backdrop-blur-md"
        }`}
      ></div>

      {/* Gradient glow accents */}
      <div className="absolute top-0 left-[-100px] w-80 h-80 bg-orange-500/20 blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-0 right-[-100px] w-96 h-96 bg-yellow-400/20 blur-[120px] animate-pulse delay-2000"></div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-center mb-14 text-orange-500"
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -30 }}
              transition={{ duration: 0.6 }}
              className={`relative max-w-lg w-full mx-auto text-center px-8 py-12 rounded-3xl shadow-2xl border border-white/10 ${
                theme === "light"
                  ? "bg-white/80 backdrop-blur-xl"
                  : "bg-gray-900/70 backdrop-blur-xl"
              }`}
            >
              <motion.img
                src={testimonials[currentIndex].image}
                alt={testimonials[currentIndex].name}
                className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-orange-500 shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
