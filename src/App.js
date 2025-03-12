import React, { useState } from "react";
import Navbar from "./components/Navbar";
import HomeUser from "./components/HomeUser";
import About from "./components/About";
import Menu from "./components/Menu";
import Products from "./components/Products";
import Review from "./components/Review";
import Contact from "./components/Contact";
import Blog from "./components/Blog";
import Footer from "./components/Footer";
import "./assets/css/style.css";


import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  spacing: 8, // Base spacing unit
});

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  
  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const removeFromCart = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
  };

  return(
    <>
    <Navbar cart={cartItems} removeFromCart={removeFromCart} 
    />
      <HomeUser />
    <About />
    <Menu addToCart={addToCart} />
    <Products />
    <Review />
    <Contact />
    <Blog />
    <Footer />
  </>
  );
}
export default App;
