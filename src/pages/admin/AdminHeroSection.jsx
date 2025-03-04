import { useState, useEffect } from "react";

const AdminHeroSection = () => {
  const [slides, setSlides] = useState([]);
  const [newSlide, setNewSlide] = useState({ text: "", subtext: "", image: null });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/slides`)
      .then((res) => res.json())
      .then((data) => setSlides(data))
      .catch((err) => console.error("Error fetching slides:", err));
  }, []);
  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  
  const handleImageUpload = async (file) => {
    if (!file) {
      console.error("No file selected for upload");
      return null;
    }
  
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
  
    console.log("Uploading to Cloudinary with:", {
      file,
      upload_preset: UPLOAD_PRESET,
      cloud_name: CLOUD_NAME,
    });
  
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Cloudinary Upload Error:", errorData);
        return null;
      }
  
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };
  

  const handleAddSlide = async () => {
    if (!newSlide.image) return;
    
    const imageUrl = await handleImageUpload(newSlide.image);
    if (!imageUrl) return;

    const slideData = { text: newSlide.text, subtext: newSlide.subtext, image: imageUrl };
    
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/slides`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(slideData),
    })
      .then((res) => res.json())
      .then((data) => {
        setSlides([...slides, data]);
        setNewSlide({ text: "", subtext: "", image: null });
      });
  };

  const handleDeleteSlide = (id) => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/slides/${id}`, { method: "DELETE" })
      .then(() => setSlides(slides.filter((slide) => slide._id !== id)));
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Panel - Manage Slides</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Slide Title"
          value={newSlide.text}
          onChange={(e) => setNewSlide({ ...newSlide, text: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Slide Subtext"
          value={newSlide.subtext}
          onChange={(e) => setNewSlide({ ...newSlide, subtext: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setNewSlide({ ...newSlide, image: e.target.files[0] })}
          className="border p-2 mr-2"
        />
        <button onClick={handleAddSlide} className="bg-blue-500 text-white p-2">Add Slide</button>
      </div>
      <table className="w-full border-collapse border border-gray-300">
  <thead>
    <tr className="bg-gray-200">
      <th className="border border-gray-300 px-4 py-2">Title</th>
      <th className="border border-gray-300 px-4 py-2">Subtext</th>
      <th className="border border-gray-300 px-4 py-2">Image</th>
      <th className="border border-gray-300 px-4 py-2">Actions</th>
    </tr>
  </thead>
  <tbody>
    {slides.map((slide) => (
      <tr key={slide._id} className="text-center">
        <td className="border border-gray-300 px-4 py-2">{slide.text}</td>
        <td className="border border-gray-300 px-4 py-2">{slide.subtext}</td>
        <td className="border border-gray-300 px-4 py-2">
          <img src={slide.image} alt="Slide" className="w-32 h-20 mx-auto" />
        </td>
        <td className="border border-gray-300 px-4 py-2">
          <button
            onClick={() => handleDeleteSlide(slide._id)}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
};

export default AdminHeroSection;
