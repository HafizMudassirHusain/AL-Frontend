import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";

const AdminAddMenu = () => {
  const [menu, setMenu] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/menu`
      );
      setMenu(response.data);
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("description", description);
    if (image) formData.append("image", image);

    try {
      if (editItem) {
        await axios.put(
          `${import.meta.env.VITE_API_BASE_URL}/api/menu/${editItem._id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setMessage("✅ Menu item updated successfully!");
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/menu`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setMessage("✅ Menu item added successfully!");
      }

      setEditItem(null);
      setName("");
      setCategory("");
      setPrice("");
      setDescription("");
      setImage(null);
      fetchMenu();
      setTimeout(() => setMessage(""), 2500);
    } catch (error) {
      setMessage("❌ Error saving menu item", error);
    }
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setName(item.name);
    setCategory(item.category);
    setPrice(item.price);
    setDescription(item.description);
    setImage(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/menu/${id}`);
      setMenu(menu.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting menu item:", error);
    }
  };

  // Framer motion animations
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-6">
        {/* HEADER */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="text-center mb-12"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-4xl font-bold text-gray-900 mb-3"
          >
            {editItem ? "Edit Menu Item" : "Add New Menu Item"}
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Easily manage and update your restaurant menu in one place.
          </motion.p>
        </motion.div>

        {/* FORM */}
        <motion.div
          variants={fadeInUp}
          className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8 border border-orange-100"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {message && (
              <p className="text-center font-semibold text-orange-600">
                {message}
              </p>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Item name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category
                </label>
                <input
                  type="text"
                  placeholder="e.g. Drinks, Snacks"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price (Rs)
                </label>
                <input
                  type="number"
                  placeholder="Enter price"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-orange-500"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                rows="3"
                placeholder="Short description about the dish..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300"
            >
              <FiPlus size={18} />
              {editItem ? "Update Item" : "Add Item"}
            </motion.button>
          </form>
        </motion.div>

        {/* MENU TABLE */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
            Menu Items
          </h2>

          {menu.length === 0 ? (
            <p className="text-center text-gray-600">No items added yet.</p>
          ) : (
            <div className="overflow-x-auto rounded-2xl shadow-lg bg-white border border-orange-100">
              <table className="w-full text-left border-collapse">
                <thead className="bg-orange-100 text-gray-800">
                  <tr>
                    <th className="p-4 font-semibold">Image</th>
                    <th className="p-4 font-semibold">Name</th>
                    <th className="p-4 font-semibold">Category</th>
                    <th className="p-4 font-semibold">Price</th>
                    <th className="p-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {menu.map((item) => (
                    <motion.tr
                      key={item._id}
                      variants={fadeInUp}
                      className="border-b hover:bg-orange-50 transition duration-200"
                    >
                      <td className="p-3">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-12 w-12 rounded-md object-cover"
                          />
                        ) : (
                          <span className="text-gray-400 italic">No Image</span>
                        )}
                      </td>
                      <td className="p-3 font-medium text-gray-800">
                        {item.name}
                      </td>
                      <td className="p-3">{item.category}</td>
                      <td className="p-3 font-semibold text-orange-500">
                        Rs. {item.price}
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-blue-600 hover:text-blue-800 transition mx-2"
                        >
                          <FiEdit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="text-red-500 hover:text-red-700 transition mx-2"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminAddMenu;
