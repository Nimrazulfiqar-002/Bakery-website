import React, { useRef } from "react";
import Logo from "../assets/images/logo-1@2x.png";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";
import { useNavigate } from "react-router-dom";

const Navbar = ({ cart, removeFromCart }) => {
  const navbarRef = useRef();
  const searchRef = useRef();
  const cartRef = useRef();
  const navigate = useNavigate();

  const navbarHandler = () => {
    if(navbarRef.current){
      navbarRef.current.classList.toggle("active");
    }
  };

  const searchHandler = () => {
    if (searchRef.current) {
      searchRef.current.classList.toggle("active");
    }
    // if (navbarRef.current) {
    //   navbarRef.current.classList.remove("active");
    // }
    // if (cartRef.current) {
    //   cartRef.current.classList.remove("active");
    // }
  };

  const cartHandler = () => {
    if (cartRef.current) {
      cartRef.current.classList.toggle("active");
    }
    if (searchRef.current) {
      searchRef.current.classList.remove("active");
    }
    if (navbarRef.current) {
      navbarRef.current.classList.remove("active");
    }
  };

  const handleCheckoutClick = async () => {
    try {
      const docRef = await addDoc(collection(db, "customerinfo"), {
        cart: cart,
      });
      localStorage.setItem("cartId", docRef.id); // Save the document ID in local storage
      navigate("/userform");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <header className="header">
      <a href="#" className="logo">
        <img src={Logo} alt="" />
      </a>
      <nav className="navbar" ref={navbarRef} >
        <a href="#HomeUser">Home</a>
        <a href="#about">about</a>
        <a href="#menu">menu</a>
        <a href="#products">products</a>
        <a href="#review">review</a>
        <a href="#contact">contact</a>
        <a href="#blogs">blogs</a>
        
      </nav>
      <div className="icons">
        <div className="fas fa-search" id="search-btn" onClick={searchHandler}>
        </div>
        <div className="fas fa-shopping-cart" id="cart-btn" onClick={cartHandler}>{cart.length}</div>
        <div className="fas fa-bars" id="menu-btn" onClick={navbarHandler}></div>
      </div>
      
      <div className="cart-items-container" ref={cartRef}>
      <div><center><h2>Shopping Cart</h2></center></div>
        {cart.map((item, index) => (
          <div className="cart-item" key={index}>
            <span className="fas fa-times" onClick={() => removeFromCart(index)}></span>
            <img src={item.img} alt="" />
            <div className="cart">

                  <div className="content" key={index}>
                     <h3>{item.name}</h3>
                      <div className="price">
                        {item.price ? `${item.price.toFixed(2)}` : 'Price not available'}
                      </div>
                  </div>
            </div>

{/*  */}
          </div>
        ))}
         <div className="total">
                 <h3>Total Price:</h3>
                   <div className="price">
                    {cart.reduce((total, cartItem) => total + (cartItem.price || 0), 0).toFixed(2)}
                   </div>
           </div>
          <div>Total Items: {cart.length}</div> 
        
        <button className="btn" id="Checkout-btn" onClick={handleCheckoutClick}> checkout now</button>
      </div>
    </header>
  );
};

export default Navbar;
