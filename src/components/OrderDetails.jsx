import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { useNavigate } from "react-router-dom";
import { Typography } from '@mui/material';

const OrderDetails = () => {
  const [orderData, setOrderData] = useState(null);
  const [shippingData, setShippingData] = useState(null);
   const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cartId = localStorage.getItem("cartId");
        const userFormId = localStorage.getItem("userFormId");

        if (cartId) {
          const cartDoc = await getDoc(doc(db, "customerinfo", cartId));
          setOrderData(cartDoc.exists() ? cartDoc.data() : null);
        }

        if (userFormId) {
          const userFormDoc = await getDoc(doc(db, "userForm", userFormId));
          setShippingData(userFormDoc.exists() ? userFormDoc.data() : null);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

 const handleOkClick = () => {
      navigate("/");
  };


  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "grey.100",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          m: 1,
          p: 2,
          border: "1px solid",
          borderColor: "grey.300",
          borderRadius: 2,
          width: "50vw",
          backgroundColor: "white",
        }}
      >
        <Box sx={{ textAlign: "center", mb: 2 }}>
        <Typography variant="h1" sx={{ fontSize: '6rem' ,fontFamily: "Roboto", fontWeight:"medium",
          paddingBottom: "3.5rem",
        }}>
            Thank <span style={{ color: '#ffc107' ,textTransform: "uppercase"}}>You</span>
         </Typography>
          <h2 sx={{fontSize: "3rem" }}>Your order is confirmed!</h2>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%"  }}>
          <Box sx={{ textAlign: "left", mb: 2, fontSize: "1.2rem" }}>
            <h3 >Order Details</h3>
            <br />
            {orderData ? (
              
                <p >
                  <strong>Items:</strong>{" "}
                  {orderData.cart.map((item) => item.name).join(", ")} <br />
                  <strong>Total Price:</strong> Rs 
                  {orderData.cart
                    .reduce((total, item) => total + (item.price || 0), 0)
                    .toFixed(2)}
                </p>
              
            ) : (
              <p>Loading order details...</p>
            )}
          </Box>

          <Box sx={{ textAlign: "left", mb: 2 ,fontSize: "1.2rem" }}>
            <h3>Shipping Details</h3> <br />
            {shippingData ? (
              
                <p>
                  <strong>Name:</strong> {shippingData.fullName} <br />
                  <strong>City:</strong> {shippingData.city} <br />
                  <strong>Address:</strong> {shippingData.address} <br />
                  <strong>Email:</strong> {shippingData.email} <br />
                  <strong>Phone:</strong> {shippingData.phoneNumber}
                </p>
              
            ) : (
              <p>Loading shipping details...</p>
            )}
          </Box>
        </Box>
        <Button variant="contained" style={{ backgroundColor: "black", color: "white", marginTop: "1rem",
              display: "inline-block",
              padding: "0.9rem 3rem",
              fontSize: "1.2rem",
              width:"10rem",
              cursor: "pointer",
              marginBottom: "10px",
              borderRadius: "0.9rem" }} onClick={handleOkClick}>
          OK
        </Button>
      </Box>
    </Box>
  );
};

export default OrderDetails;

