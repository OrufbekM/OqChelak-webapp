import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
import OrderLocation from "./pages/OrderLocation/index";
import CustomerProduct from "./pages/Product/Customer/index";

const APP_NAME = "Oqchelak";

function PageTitleManager() {
  const { pathname } = useLocation();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    let pageTitle = t("welcome.title", { defaultValue: "Welcome" });

    if (pathname === "/register") pageTitle = t("register.title");
    if (pathname === "/customer-home" || pathname === "/seller-home") {
      pageTitle = t("meta.home", { defaultValue: "Home" });
    }
    if (pathname === "/customer-product") {
      pageTitle = t("meta.product", { defaultValue: "Product" });
    }
    if (pathname === "/seller-orders" || pathname === "/customer-orders") {
      pageTitle = t("ordersCustomer.title");
    }
    if (pathname === "/order-location") {
      pageTitle = t("meta.orderLocation", { defaultValue: "Order Location" });
    }
    if (pathname === "/settings") pageTitle = t("settings.title");
    if (pathname === "/settings/profile") pageTitle = t("settings.items.profile");
    if (pathname === "/settings/privacyPolicy") pageTitle = t("settings.items.privacyPolicy");
    if (pathname === "/settings/billing") pageTitle = t("settings.items.billing");
    if (pathname === "/settings/security") pageTitle = t("settings.items.security");
    if (pathname === "/settings/language") pageTitle = t("settings.items.language");
    if (pathname === "/settings/help") pageTitle = t("settings.items.help");
    if (pathname === "/settings/about") pageTitle = t("settings.items.about");
    if (pathname === "/settings/logout") pageTitle = t("settings.items.logout");

    document.title = `${APP_NAME}-${pageTitle}`;
  }, [pathname, t, i18n.language]);

  return null;
}

const App = () => {
  return (
    <Router>
      <PageTitleManager />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/customer-home" element={<CustomerHome />} />
        <Route path="/customer-product" element={<CustomerProduct />} />
        <Route path="/seller-home" element={<SellerHome />} />
        <Route path="/seller-orders" element={<OrdersSeller />} />
        <Route path="/customer-orders" element={<OrdersCustomer />} />
        <Route path="/order-location" element={<OrderLocation />} />
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
