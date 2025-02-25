import { useState } from "react";
import axios from "axios";

const AdminAddMenu = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", image); // Append image file

    try {
      const response = await axios.post("http://localhost:5000/api/menu", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(response.data.message);
      setName("");
      setCategory("");
      setPrice("");
      setDescription("");
      setImage(null);
    } catch (error) {
      setMessage("Error adding menu item");
    }
  };

  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold">Add New Menu Item</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-5 p-5 bg-white shadow-md rounded">
        {message && <p className="text-red-500">{message}</p>}

        <input type="text" placeholder="Name" className="w-full p-2 border rounded mb-2"
          value={name} onChange={(e) => setName(e.target.value)} required />

        <input type="text" placeholder="Category" className="w-full p-2 border rounded mb-2"
          value={category} onChange={(e) => setCategory(e.target.value)} required />

        <input type="number" placeholder="Price" className="w-full p-2 border rounded mb-2"
          value={price} onChange={(e) => setPrice(e.target.value)} required />

        <textarea placeholder="Description" className="w-full p-2 border rounded mb-2"
          value={description} onChange={(e) => setDescription(e.target.value)} required />

        <input type="file" accept="image/*" className="w-full p-2 border rounded mb-2"
          onChange={(e) => setImage(e.target.files[0])} required />

        <button type="submit" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Menu Item
        </button>
      </form>
    </div>
  );
};

export default AdminAddMenu;
