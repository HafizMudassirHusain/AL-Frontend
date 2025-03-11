import React, { useContext, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import testnomialuser1 from '../assets/testnomialuser1.png';
import testnomialuser2 from '../assets/testnomialuser2.png';
import testnomialuser3 from '../assets/testnomialuser3.png';
import { ThemeContext } from '../context/ThemeContext';


const Testimonials = () => {
  const testimonials = [
    {
      name: 'Ali Khan',
      review: 'The best biryani in Karachi! Highly recommended.',
      image: testnomialuser1,
      rating: 5,
    },
    {
      name: 'Fatima Ahmed',
      review: 'Amazing food and great service. Will order again!',
      image: testnomialuser2,
      rating: 3,
    },
    {
      name: 'Usman Malik',
      review: 'The chicken karahi is to die for. Delicious!',
      image: testnomialuser3,
      rating: 5,
    },
    {
      name: 'Sara Khan',
      review: 'The desserts are heavenly. Love the Gajjar ka Halwa!',
      image: testnomialuser1,
      rating: 4,
    },
    {
      name: 'Zainab Ali',
      review: 'The Singaporean Rice is a must-try. Perfectly cooked!',
      image: testnomialuser2,
      rating: 4.5,
    },
    {
      name: 'Ahmed Raza',
      review: 'Great variety of dishes and consistent quality.',
      image: testnomialuser3,
      rating: 5,
    },
  ];
 
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Auto-switch testimonials every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 10));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      setProgress(0);
    }
  }, [progress, testimonials.length]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    setProgress(0);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
    setProgress(0);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`text-2xl ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
        >
          ★
        </span>
      );
    }
    return stars;
  };
    const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className="py-12">
      <div className={`container mx-auto px-6 pb-10 ${theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}`}>
        <h2 className="text-3xl font-bold text-center mb-8 pt-10">What Our Customers Say</h2>
        <div className="relative h-96 flex items-center justify-center">
          {/* Previous Button */}
          <button
            onClick={handlePrevious}
            className={`absolute left-0 z-10 p-2   
              ${theme === 'light' ? 'bg-gray-100 text-black' : 'bg-gray-100 text-black'}
             rounded-full shadow-md hover:bg-gray-200 transition duration-300`}
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

          {/* Testimonial Slider */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.5 }}
              className="absolute w-full max-w-lg text-center"
            >
              <div className={` ${theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'} p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300`}>
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-orange-500"
                />
                <h3 className="text-xl font-semibold mb-2 ">
                  {testimonials[currentIndex].name}
                </h3>
                <div className="flex justify-center mb-4">
                  {renderStars(testimonials[currentIndex].rating)}
                </div>
                <p className=" italic">
                  "{testimonials[currentIndex].review}"
                </p>
              </div>
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mt-6">
                <div
                  className="bg-orange-500 h-2 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className={`absolute right-0 z-10 p-2 
                ${theme === 'light' ? 'bg-gray-100 text-black' : 'bg-gray-100 text-black'} 
                rounded-full shadow-md hover:bg-gray-200 transition duration-300`}
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
    </div>
  );
};

export default Testimonials;