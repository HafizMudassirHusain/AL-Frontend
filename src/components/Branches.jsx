import React from 'react';
import branch1 from '../assets/branch1.jpg';
import branch2 from '../assets/branch2.webp';
import branch3 from '../assets/branch3.jpg';
import { motion } from 'framer-motion';

const Branches = () => {
  const branches = [
    {
      name: 'Gulshan-e-Johar',
      address: 'House #12, Ground Floor, Gulistan-e-Johar, Karachi',
      image: branch1,
      phone: '03XX-XXXXXXX',
      hours: '10:00 AM - 10:00 PM',
    },
    {
      name: 'Gulshan Iqbal',
      address: 'Block 2, Gulshan Iqbal, Karachi',
      image: branch2,
      phone: '03XX-XXXXXXX',
      hours: '10:00 AM - 10:00 PM',
    },
    {
      name: 'North Nazimabad',
      address: 'Main Road, North Nazimabad, Karachi',
      image: branch3,
      phone: '03XX-XXXXXXX',
      hours: '10:00 AM - 10:00 PM',
    },
  ];

  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Our Branches</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {branches.map((branch, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src={branch.image} alt={branch.name} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{branch.name}</h3>
                <p className="text-gray-600 mb-4">{branch.address}</p>
                <div className="space-y-2">
                  <p className="text-gray-600">
                    <span className="font-semibold">Phone:</span> {branch.phone}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">Opening Hours:</span> {branch.hours}
                  </p>
                </div>
                <button className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition duration-300">
                  Get Directions
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Branches;