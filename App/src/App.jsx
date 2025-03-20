import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";

import Home from "./pages/Home";
import Footer from "./components/Footer";
import Trainers from "./pages/Trainers";

import About from "./pages/About";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import ProductList from "./pages/ProductList";
import Plans from "./pages/Plans";
import Cart from "./pages/Cart";
import PaymentPortal from "./pages/PaymentPortal";
import PlanPayment from "./pages/PlanPayment";

const App = () => (
  <div className="mx-4 sm:mx-[5.5%]">
    <ToastContainer />
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/trainers" element={<Trainers />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/plans" element={<Plans />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/payment" element={<PaymentPortal />} />
      <Route path="/plan-pay" element={<PlanPayment />} />
    </Routes>
    <Footer />
  </div>
);

export default App;
