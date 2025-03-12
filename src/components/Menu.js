import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

//fetch menu data from firebase
const Menu = ({ addToCart }) => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      const menuCollection = collection(db, "menu");
      const menuSnapshot = await getDocs(menuCollection);
      const menuList = menuSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMenuItems(menuList);
    };

    fetchMenuItems();
  }, []);

  return (
    <section className="menu" id="menu">
      <h1 className="heading">
        our <span>menu</span>
      </h1>
      <div className="box-container">
        {menuItems.map((item, index) => (
          <div className="box" key={index}>
            <img src={item.img} alt={item.name} />
            <h3>{item.name}</h3>
            <div className="price">
              RS {item.price} <span>RS {item.price + 300}</span>
            </div>
            <button
              className="btn"
              onClick={() => {
                console.log("Adding to cart:", item);
                addToCart(item);
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Menu;
