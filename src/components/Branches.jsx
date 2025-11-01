import { motion } from 'framer-motion';

const Branches = () => {
  const branches = [
    {
      name: 'Gulistan-e-Johar',
      address: 'House #12, Ground Floor, Gulistan-e-Johar, Karachi',
      map: 'https://maps.google.com',
      phone: '03XX-XXXXXXX',
      hours: '10:00 AM - 10:00 PM',
    },
    {
      name: 'Gulshan Iqbal',
      address: 'Block 2, Gulshan Iqbal, Karachi',
      map: 'https://maps.google.com',
      phone: '03XX-XXXXXXX',
      hours: '10:00 AM - 10:00 PM',
    },
    {
      name: 'North Nazimabad',
      address: 'Main Road, North Nazimabad, Karachi',
      map: 'https://maps.google.com',
      phone: '03XX-XXXXXXX',
      hours: '10:00 AM - 10:00 PM',
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center mb-10 brand-text-gradient">Our Branches</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {branches.map((branch, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -6, scale: 1.01 }}
              className="relative overflow-hidden rounded-2xl border bg-white/70 dark:bg-gray-800/60 backdrop-blur-xl border-orange-200/40 dark:border-gray-700/50 shadow-md hover:shadow-xl transition"
            >
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">{branch.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-3">{branch.address}</p>
                <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                  <p><span className="font-medium">Phone:</span> {branch.phone}</p>
                  <p><span className="font-medium">Hours:</span> {branch.hours}</p>
                </div>
                <a href={branch.map} target="_blank" rel="noreferrer" className="inline-block mt-4 px-4 py-2 rounded-full brand-gradient text-white font-semibold hover:opacity-90">
                  Get Directions
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Branches;