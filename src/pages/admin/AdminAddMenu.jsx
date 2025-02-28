import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

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
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/menu`);
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
        // Update Existing Menu Item
        await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/menu/${editItem._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setMessage("Menu item updated successfully!");
      } else {
        // Add New Menu Item
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/menu`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setMessage("Menu item added successfully!");
      }

      setEditItem(null);
      setName("");
      setCategory("");
      setPrice("");
      setDescription("");
      setImage(null);
      fetchMenu(); // Refresh menu list
    } catch (error) {
      setMessage("Error saving menu item");
    }
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setName(item.name);
    setCategory(item.category);
    setPrice(item.price);
    setDescription(item.description);
    setImage(null);
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

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center mb-12"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-4xl font-bold text-gray-800 mb-4"
          >
            {editItem ? "Edit Menu Item" : "Add New Menu Item"}
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Manage your menu items here.
          </motion.p>
        </motion.div>

        {/* Add/Edit Menu Form */}
        <motion.div
          variants={fadeInUp}
          className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {message && (
              <p className="text-center text-green-500 font-semibold">{message}</p>
            )}

            <div>
              <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-gray-700 font-semibold mb-2">
                Category
              </label>
              <input
                type="text"
                id="category"
                placeholder="Category"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-gray-700 font-semibold mb-2">
                Price
              </label>
              <input
                type="number"
                id="price"
                placeholder="Price"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">
                Description
              </label>
              <textarea
                id="description"
                placeholder="Description"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="image" className="block text-gray-700 font-semibold mb-2">
                Image
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition duration-300"
            >
              {editItem ? "Update Item" : "Add Item"}
            </button>
          </form>
        </motion.div>

        {/* Menu Items Table */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mt-12"
        >
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Menu Items</h2>
          {menu.length === 0 ? (
            <p className="text-center text-gray-600">No items added yet.</p>
          ) : (
            <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-4 text-left">Name</th>
                    <th className="p-4 text-left">Category</th>
                    <th className="p-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {menu.map((item) => (
                    <motion.tr
                      key={item._id}
                      variants={fadeInUp}
                      className="border-b hover:bg-gray-50 transition duration-300"
                    >
                      <td className="p-4">{item.name}</td>
                      <td className="p-4">{item.category}</td>
                      <td className="p-4">
                        <button
                          onClick={() => handleEdit(item)}
                          className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition duration-300 mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-300"
                        >
                          Delete
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