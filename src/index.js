import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserForm from "./components/UserForm.jsx";
import OrderDetails from  "./components/OrderDetails.jsx";
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  StyledEngineProvider,
} from "@mui/material";

import "./global.css";

const muiTheme = createTheme();

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Router>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <Routes>
        <Route path="/" element={<App />}/>
        <Route path="/userform" element={<UserForm/>}/>
        <Route path="/orderDetails" element={<OrderDetails/>}/>
        </Routes>
      </ThemeProvider>
    </StyledEngineProvider>
  </Router>
);


reportWebVitals();
