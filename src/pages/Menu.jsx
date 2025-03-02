import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import Menu from '../components/Menutemp'

const MenuPage = () => {
  

  return (
    <div className="container mx-auto px-6 py-12">
      <Menu />
  </div>
  );
};

export default MenuPage;
