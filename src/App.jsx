import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register/index";
import Welcome from "./pages/Welcome/index";
import CustomerHome from "./pages/Home/Customer/index";
import SellerHome from "./pages/Home/Seller/index";
import Orders from "./pages/Orders/index";
import Settings from "./pages/Settings/index";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/customer-home" element={<CustomerHome />} />
        <Route path="/seller-home" element={<SellerHome />} />
        <Route path="myorders" element={<Orders />} />
        {/* Dinnaxuy djala */}
        {/* xop */}
        {/* Kot bla */}
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
};

export default App;
