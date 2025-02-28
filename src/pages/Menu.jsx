import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";


const Menu = () => {
  const [menu, setMenu] = useState([]);
  const {addToCart} = useCart();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/menu`)
      .then(response => setMenu(response.data))
      .catch(error => console.error("Error fetching menu:", error));
  }, []);

  return (
    <div className="container mx-auto px-6 py-12">
    <h2 className="text-3xl font-bold text-center mb-8">Our Menu</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {menu.map((item) => (
        <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
            <p className="text-gray-600 mb-4">{item.description}</p>
            <div className="flex justify-between items-center">
              <p className="text-lg font-bold text-orange-500">Rs. {item.price}</p>
              <button
                onClick={() => addToCart(item)}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition duration-300"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};

export default Menu;
