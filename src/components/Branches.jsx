import React from 'react';

const Branches = () => {
  const branches = [
    { name: 'Gulshan-e-Johar', address: 'House #12, Ground Floor, Gulistan-e-Johar, Karachi' },
    { name: 'Gulshan Iqbal', address: 'Block 2, Gulshan Iqbal, Karachi' },
    { name: 'North Nazimabad', address: 'Main Road, North Nazimabad, Karachi' },
  ];

  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Our Branches</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {branches.map((branch, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold mb-2">{branch.name}</h3>
            <p className="text-gray-600">{branch.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Branches;