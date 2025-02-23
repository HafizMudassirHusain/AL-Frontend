import React from 'react';
import testnomialuser1 from '../assets/testnomialuser1.png';
import testnomialuser2 from '../assets/testnomialuser2.png';
import testnomialuser3 from '../assets/testnomialuser3.png';


const Testimonials = () => {
  const testimonials = [
    {
      name: 'Ali Khan',
      review: 'The best biryani in Karachi! Highly recommended.',
      image: testnomialuser1,
    },
    {
      name: 'Fatima Ahmed',
      review: 'Amazing food and great service. Will order again!',
      image: testnomialuser2,
    },
    {
      name: 'Usman Malik',
      review: 'The chicken karahi is to die for. Delicious!',
      image: testnomialuser3,
    },
  ];

  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
              <img src={testimonial.image} alt={testimonial.name} className="w-20 h-20 rounded-full mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{testimonial.name}</h3>
              <p className="text-gray-600">{testimonial.review}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;