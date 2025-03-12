import React from "react";
import { collection, addDoc, query, where, getDocs, } from "firebase/firestore";
import { db } from "../src/components/firebase";

import menuImage1 from "./assets/images/menu-1.png";
import menuImage2 from "./assets/images/menu-2.png";
import menuImage3 from "./assets/images/menu-3.png";
import menuImage4 from "./assets/images/menu-4.png";
import menuImage5 from "./assets/images/menu-5.png";
import menuImage6 from "./assets/images/menu-6.png";
import cartImage1 from "./assets/images/cart-item-1.png";
import cartImage2 from "./assets/images/cart-item-2.png";
import cartImage3 from "./assets/images/cart-item-3.png";
import cartImage4 from "./assets/images/cart-item-4.png";
import reviewImage1 from "./assets/images/pic-1.png";
import reviewImage2 from "./assets/images/pic-1.png";
import reviewImage3 from "./assets/images/pic-1.png";
import blogImage1 from "./assets/images/blog-1.jpg";
import blogImage2 from "./assets/images/blog-2.jpg";
import blogImage3 from "./assets/images/blog-3.jpg";


// store the data into firebase
const menuData = [
  { name: "Pineapple Upside-Down", img: menuImage1, price: 1200 },
  { name: "Chocolate Fudge Cake", img: menuImage2, price: 1200 },
  { name: "Simple Pineapple Cake", img: menuImage3, price: 1200 },
  { name: "Marble Cake", img: menuImage4, price: 1200 },
  { name: "Coffee Cake", img: menuImage5, price: 1200 },
  { name: "Black Forest Cake", img: menuImage6, price: 1200 },
];

const AddMenuItems = async () => {
  try {
    const menuCollection = collection(db, "menu");

    for (const item of menuData) {
    
      const q = query(
        menuCollection,
        where("name", "==", item.name) 
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        const docRef = await addDoc(menuCollection, item);
        // console.log(`Added menu item with ID: ${docRef.id}`);
      } else {
        console.log(`Menu item "${item.name}" already exists, skipping.`);
      }
    }
    // console.log("All menu items added successfully!");
  } catch (error) {
    console.error("Error adding menu items:", error);
  }
};

AddMenuItems();

const cart = [
  {
    img: cartImage1,
  },
  {
    img: cartImage2,
  },
  {
    img: cartImage3,
  },
  {
    img: cartImage4,
  },
];

const product = [
  {
    img: menuImage1,
    price :"RS 1200 ",
    span:"RS 1500"
  },
  {
    img: menuImage2,
    price :"RS 1200 ",
    span:"RS 1500"
  },
  {
    img: menuImage3,
    price :"RS 1200 ",
    span:"RS 1500"
  },
];
const review = [
  {
    img: reviewImage1,
  },
  {
    img: reviewImage2,
  },
  {
    img: reviewImage3,
  },
];
const blog = [
  {
    img: blogImage1,
  },
  {
    img: blogImage2,
  },
  {
    img: blogImage3,
  },
];

export {  cart, product, review, blog };