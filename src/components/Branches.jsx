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
    <section className="py-24 lux-section-alt">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <p className="lux-script text-2xl mb-2">Find Us</p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold capitalize text-gold">
            Our Branches
          </h2>
          <div className="lux-divider" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {branches.map((branch, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -6 }}
              className="relative overflow-hidden lux-card hover:border-[#D9A44D]/60 hover:shadow-[0_0_25px_rgba(217,164,77,0.15)] transition"
            >
              <div className="p-7">
                <h3 className="font-display text-xl font-semibold uppercase tracking-[0.08em] text-gold mb-2">
                  {branch.name}
                </h3>
                <p className="text-muted-warm mb-4 text-sm leading-relaxed">{branch.address}</p>
                <div className="text-sm text-muted-warm space-y-1">
                  <p><span className="text-[#ECE3D0]">Phone:</span> {branch.phone}</p>
                  <p><span className="text-[#ECE3D0]">Hours:</span> {branch.hours}</p>
                </div>
                <a href={branch.map} target="_blank" rel="noreferrer" className="btn-lux-outline !text-[12px] !py-2 !px-4 mt-5">
                  Get Directions <span className="btn-dash" />
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