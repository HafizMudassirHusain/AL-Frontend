import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const AdminHeroSection = () => {
  const [slides, setSlides] = useState([]);
  const [newSlide, setNewSlide] = useState({ text: "", subtext: "", image: null });
  const [loading, setLoading] = useState(false);

  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/slides`)
      .then((res) => res.json())
      .then((data) => setSlides(data))
      .catch((err) => console.error("Error fetching slides:", err));
  }, []);

  const handleImageUpload = async (file) => {
    if (!file) return null;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const handleAddSlide = async () => {
    if (!newSlide.text || !newSlide.image) return alert("Please fill all fields!");
    setLoading(true);

    const imageUrl = await handleImageUpload(newSlide.image);
    if (!imageUrl) return;

    const slideData = { text: newSlide.text, subtext: newSlide.subtext, image: imageUrl };

    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/slides`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(slideData),
    })
      .then((res) => res.json())
      .then((data) => {
        setSlides([...slides, data]);
        setNewSlide({ text: "", subtext: "", image: null });
      })
      .finally(() => setLoading(false));
  };

  const handleDeleteSlide = (id) => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/slides/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then(() => setSlides(slides.filter((slide) => slide._id !== id)));
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-[#16130F] p-8">
      <motion.h1
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="font-display text-4xl font-semibold capitalize text-[#D9A44D] text-center mb-10"
      >
        Manage Hero Slides
      </motion.h1>

      {/* Add New Slide Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="bg-[#231E18] border border-[#D9A44D]/20 shadow-lg rounded-2xl p-6 mb-10 max-w-4xl mx-auto"
      >
        <h2 className="text-xl text-[#D9A44D] font-semibold mb-4">Add New Slide</h2>

        <div className="flex flex-col md:flex-row gap-4 items-center">
          <input
            type="text"
            placeholder="Slide Title"
            value={newSlide.text}
            onChange={(e) => setNewSlide({ ...newSlide, text: e.target.value })}
            className="flex-1 bg-[#16130F] border border-[#D9A44D]/30 rounded-lg p-3 text-white focus:outline-none focus:border-[#D9A44D] transition"
          />
          <input
            type="text"
            placeholder="Slide Subtext"
            value={newSlide.subtext}
            onChange={(e) => setNewSlide({ ...newSlide, subtext: e.target.value })}
            className="flex-1 bg-[#16130F] border border-[#D9A44D]/30 rounded-lg p-3 text-white focus:outline-none focus:border-[#D9A44D] transition"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setNewSlide({ ...newSlide, image: e.target.files[0] })}
            className="flex-1 text-gray-300 bg-[#16130F] border border-[#D9A44D]/30 rounded-lg p-2 focus:border-[#D9A44D]"
          />
          <button
            onClick={handleAddSlide}
            disabled={loading}
            className={`bg-[#D9A44D] hover:bg-[#E8C06A] text-[#1c1812] px-6 py-2 rounded-lg font-medium transition-all ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Uploading..." : "Add Slide"}
          </button>
        </div>
      </motion.div>

      {/* Slides Table */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="bg-[#231E18] border border-[#D9A44D]/20 shadow-lg rounded-2xl p-6 overflow-x-auto"
      >
        <h2 className="text-xl text-[#D9A44D] font-semibold mb-4">Existing Slides</h2>

        <table className="w-full text-left border-collapse text-gray-300">
          <thead>
            <tr className="bg-[#D9A44D]/10 text-[#D9A44D]">
              <th className="px-4 py-3 rounded-tl-lg">Title</th>
              <th className="px-4 py-3">Subtext</th>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3 text-center rounded-tr-lg">Actions</th>
            </tr>
          </thead>
          <tbody>
            {slides.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No slides available.
                </td>
              </tr>
            ) : (
              slides.map((slide, index) => (
                <motion.tr
                  key={slide._id || index}
                  variants={fadeIn}
                  className="hover:bg-[#D9A44D]/5 transition-all duration-300"
                >
                  <td className="px-4 py-3 font-medium text-white">{slide.text}</td>
                  <td className="px-4 py-3 text-gray-400">{slide.subtext}</td>
                  <td className="px-4 py-3">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      src={slide.image}
                      alt="Slide"
                      className="w-32 h-20 object-cover rounded-lg shadow-md border border-[#D9A44D]/25"
                    />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleDeleteSlide(slide._id)}
                      className="border border-red-500/60 text-red-400 hover:bg-red-500/10 px-4 py-1.5 rounded-lg transition"
                    >
                      Delete
                    </button>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default AdminHeroSection;
