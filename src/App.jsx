import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register/index";
import Welcome from "./pages/Welcome/index";
import CustomerHome from "./pages/Home/Customer/index";
import SellerHome from "./pages/Home/Seller/index";
import OrdersSeller from "./pages/Orders/Seller/index";
import OrdersCustomer from "./pages/Orders/Customer/index";
import Settings from "./pages/Settings/index";
import Profile from "./pages/Settings/Profile";
import Privacy from "./pages/Settings/Privacy";
import Billing from "./pages/Settings/Billing";
import Security from "./pages/Settings/Security";
import Language from "./pages/Settings/Language";
import Help from "./pages/Settings/Help";
import About from "./pages/Settings/About";
import Logout from "./pages/Settings/Logout";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/customer-home" element={<CustomerHome />} />
        <Route path="/seller-home" element={<SellerHome />} />
        <Route path="myorders" element={<OrdersSeller />} />
        <Route path="/customer-orders" element={<OrdersCustomer />} />
        {/* Dinnaxuy djala */}
        {/* xop */}
        {/* Kot bla */}
        {/* we have telegram btw🥀🥀🥀 */}
        {/* px djala */}
        {/* dalbayob komment yozib push qibti yeban🥀🥀🥀 */}
        <Route path="/settings" element={<Settings />} />
        <Route path="/settings/profile" element={<Profile />} />
        <Route path="/settings/privacyPolicy" element={<Privacy />} />
        <Route path="/settings/billing" element={<Billing />} />
        <Route path="/settings/security" element={<Security />} />
        <Route path="/settings/language" element={<Language />} />
        <Route path="/settings/help" element={<Help />} />
        <Route path="/settings/about" element={<About />} />
        <Route path="/settings/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
};

export default App;
