import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import ThemeContextProvider from "./context/ThemeContext";



ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <AuthProvider>
    <CartProvider>
    <ThemeContextProvider>
    <App />
    </ThemeContextProvider>
    </CartProvider>
  </AuthProvider>
</BrowserRouter>
);
